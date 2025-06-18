package main

import (
	"time"
)

// User represents the user model
type User struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"` // The hash of the password
	FullName     string    `json:"full_name,omitempty"`
	Phone        string    `json:"phone,omitempty"`
	Avatar       string    `json:"avatar,omitempty"`
	Bio          string    `json:"bio,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// UserProfile 用户档案信息（不包含敏感信息）
type UserProfile struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	FullName  string    `json:"full_name,omitempty"`
	Phone     string    `json:"phone,omitempty"`
	Avatar    string    `json:"avatar,omitempty"`
	Bio       string    `json:"bio,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// UpdateProfileRequest 更新用户信息请求
type UpdateProfileRequest struct {
	FullName string `json:"full_name"`
	Phone    string `json:"phone"`
	Bio      string `json:"bio"`
}

// ChangePasswordRequest 修改密码请求
type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password"`
	NewPassword     string `json:"new_password"`
	ConfirmPassword string `json:"confirm_password"`
}

// UserSession 用户会话信息（用于前端状态管理）
type UserSession struct {
	UserID   int    `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Token    string `json:"token,omitempty"` // 未来可以实现JWT
}

 