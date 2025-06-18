package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

// InitDB initializes the database connection
func InitDB() {
	var err error
	dsn := os.Getenv("DSN")
	if dsn == "" {
		log.Println("DSN environment variable not set. Using default.")
		// Default DSN for local development.
		dsn = "user:password@tcp(127.0.0.1:3308)/final_project_db?parseTime=true"
	}

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Printf("Error opening database: %v", err)
		// We don't fatal here, to allow server to start and report health.
		// Handlers should check if DB is nil.
		return
	}

	DB.SetMaxOpenConns(25)
	DB.SetMaxIdleConns(25)
	DB.SetConnMaxLifetime(5 * time.Minute)

	err = DB.Ping()
	if err != nil {
		log.Printf("Error connecting to the database: %v. The application will continue to run but database queries will fail.", err)
		// Close the connection and set DB to nil so handlers can check for it.
		DB.Close()
		DB = nil
		return
	}

	fmt.Println("Successfully connected to the database!")
}

// GetDB returns the database connection pool
func GetDB() *sql.DB {
	return DB
}

// CreateUser inserts a new user into the database
func CreateUser(user *User) (int64, error) {
	query := `INSERT INTO users (username, email, password_hash, full_name, phone, bio, created_at, updated_at) 
			  VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`
	result, err := DB.Exec(query, user.Username, user.Email, user.PasswordHash, 
		user.FullName, user.Phone, user.Bio)
	if err != nil {
		return 0, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	return id, nil
}

// GetUserByUsername 根据用户名获取用户
func GetUserByUsername(username string) (*User, error) {
	user := &User{}
	query := `SELECT id, username, email, password_hash, 
			  COALESCE(full_name, '') as full_name, 
			  COALESCE(phone, '') as phone, 
			  COALESCE(avatar, '') as avatar, 
			  COALESCE(bio, '') as bio, 
			  created_at, 
			  COALESCE(updated_at, created_at) as updated_at 
			  FROM users WHERE username = ?`
	
	err := DB.QueryRow(query, username).Scan(
		&user.ID, &user.Username, &user.Email, &user.PasswordHash, 
		&user.FullName, &user.Phone, &user.Avatar, &user.Bio,
		&user.CreatedAt, &user.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		return nil, fmt.Errorf("failed to get user: %v", err)
	}

	return user, nil
}

// GetUserByEmail retrieves a user by their email address
func GetUserByEmail(email string) (*User, error) {
	user := &User{}
	query := `SELECT id, username, email, password_hash, 
			  COALESCE(full_name, '') as full_name, 
			  COALESCE(phone, '') as phone, 
			  COALESCE(avatar, '') as avatar, 
			  COALESCE(bio, '') as bio, 
			  created_at, 
			  COALESCE(updated_at, created_at) as updated_at 
			  FROM users WHERE email = ?`
	err := DB.QueryRow(query, email).Scan(&user.ID, &user.Username, &user.Email, &user.PasswordHash,
		&user.FullName, &user.Phone, &user.Avatar, &user.Bio, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}

// GetUserByID retrieves a user by their ID
func GetUserByID(id int) (*User, error) {
	user := &User{}
	query := `SELECT id, username, email, password_hash, 
			  COALESCE(full_name, '') as full_name, 
			  COALESCE(phone, '') as phone, 
			  COALESCE(avatar, '') as avatar, 
			  COALESCE(bio, '') as bio, 
			  created_at, 
			  COALESCE(updated_at, created_at) as updated_at 
			  FROM users WHERE id = ?`
	err := DB.QueryRow(query, id).Scan(&user.ID, &user.Username, &user.Email, &user.PasswordHash,
		&user.FullName, &user.Phone, &user.Avatar, &user.Bio, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		return nil, fmt.Errorf("failed to get user: %v", err)
	}
	return user, nil
}

// UpdateUserProfile 更新用户资料信息
func UpdateUserProfile(userID int, req *UpdateProfileRequest) error {
	query := `UPDATE users SET full_name = ?, phone = ?, bio = ?, updated_at = NOW() WHERE id = ?`
	_, err := DB.Exec(query, req.FullName, req.Phone, req.Bio, userID)
	if err != nil {
		return fmt.Errorf("failed to update user profile: %v", err)
	}
	return nil
}

// UpdateUserPassword 更新用户密码
func UpdateUserPassword(userID int, newPasswordHash string) error {
	query := `UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?`
	_, err := DB.Exec(query, newPasswordHash, userID)
	if err != nil {
		return fmt.Errorf("failed to update user password: %v", err)
	}
	return nil
}

// GetUserProfile 获取用户档案信息（不包含敏感信息）
func GetUserProfile(userID int) (*UserProfile, error) {
	profile := &UserProfile{}
	query := `SELECT id, username, email, 
			  COALESCE(full_name, '') as full_name, 
			  COALESCE(phone, '') as phone, 
			  COALESCE(avatar, '') as avatar, 
			  COALESCE(bio, '') as bio, 
			  created_at, 
			  COALESCE(updated_at, created_at) as updated_at 
			  FROM users WHERE id = ?`
	err := DB.QueryRow(query, userID).Scan(&profile.ID, &profile.Username, &profile.Email,
		&profile.FullName, &profile.Phone, &profile.Avatar, &profile.Bio, 
		&profile.CreatedAt, &profile.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		return nil, fmt.Errorf("failed to get user profile: %v", err)
	}
	return profile, nil
} 