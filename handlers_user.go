package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

// APIResponse is a standard response format for API endpoints.
type APIResponse struct {
	Status  string      `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

func writeJSON(w http.ResponseWriter, status int, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("Error writing JSON response: %v", err)
	}
}

// sendWelcomeEmail 异步发送欢迎邮件的模拟函数
func sendWelcomeEmail(email string) {
	log.Printf("📧 开始为用户 %s 发送欢迎邮件...", email)
	
	// 模拟邮件发送的延迟
	time.Sleep(3 * time.Second)
	
	log.Printf("✅ 欢迎邮件已成功发送给用户: %s", email)
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
		FullName string `json:"full_name"`
		Phone    string `json:"phone"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid request body"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	// 验证输入
	if strings.TrimSpace(req.Username) == "" {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Username is required"})
		return
	}
	if strings.TrimSpace(req.Email) == "" {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Email is required"})
		return
	}
	if len(req.Password) < 8 {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Password must be at least 8 characters long"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Failed to hash password: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to process password"})
		return
	}

	user := &User{
		Username:     strings.TrimSpace(req.Username),
		Email:        strings.TrimSpace(req.Email),
		PasswordHash: string(hashedPassword),
		FullName:     strings.TrimSpace(req.FullName),
		Phone:        strings.TrimSpace(req.Phone),
	}

	if _, err := CreateUser(user); err != nil {
		log.Printf("Failed to create user: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to create user. Email or username may already exist."})
		return
	}

	// 🚀 异步发送欢迎邮件，提升用户注册体验
	go sendWelcomeEmail(user.Email)
	
	// 立即返回成功响应，不等待邮件发送完成
	writeJSON(w, http.StatusCreated, APIResponse{Status: "success", Message: "注册成功"})
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email    string `json:"email"`
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid request body"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	var user *User
	var err error
	
	// 支持用户名或邮箱登录
	if req.Email != "" {
		user, err = GetUserByEmail(req.Email)
	} else if req.Username != "" {
		user, err = GetUserByUsername(req.Username)
	} else {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Email or username is required"})
		return
	}
	
	if err != nil {
		writeJSON(w, http.StatusUnauthorized, APIResponse{Status: "error", Message: "Invalid credentials"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		writeJSON(w, http.StatusUnauthorized, APIResponse{Status: "error", Message: "Invalid email or password"})
		return
	}

	// 返回用户会话信息
	session := UserSession{
		UserID:   user.ID,
		Username: user.Username,
		Email:    user.Email,
	}

	writeJSON(w, http.StatusOK, APIResponse{
		Status:  "success", 
		Message: "登录成功",
		Data:    session,
	})
}

// GetUserProfileHandler 获取用户档案
func GetUserProfileHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userIDStr := vars["id"]
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid user ID"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	profile, err := GetUserProfile(userID)
	if err != nil {
		writeJSON(w, http.StatusNotFound, APIResponse{Status: "error", Message: "User not found"})
		return
	}

	writeJSON(w, http.StatusOK, APIResponse{
		Status: "success",
		Data:   profile,
	})
}

// UpdateUserProfileHandler 更新用户信息
func UpdateUserProfileHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userIDStr := vars["id"]
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid user ID"})
		return
	}

	var req UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid request body"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	if err := UpdateUserProfile(userID, &req); err != nil {
		log.Printf("Failed to update user profile: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to update profile"})
		return
	}

	writeJSON(w, http.StatusOK, APIResponse{Status: "success", Message: "用户信息更新成功"})
}

// ChangePasswordHandler 修改密码
func ChangePasswordHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userIDStr := vars["id"]
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid user ID"})
		return
	}

	var req ChangePasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid request body"})
		return
	}

	// 验证输入
	if len(req.NewPassword) < 8 {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "New password must be at least 8 characters long"})
		return
	}
	if req.NewPassword != req.ConfirmPassword {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "New passwords do not match"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	// 获取用户当前信息
	user, err := GetUserByID(userID)
	if err != nil {
		writeJSON(w, http.StatusNotFound, APIResponse{Status: "error", Message: "User not found"})
		return
	}

	// 验证当前密码
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.CurrentPassword)); err != nil {
		writeJSON(w, http.StatusUnauthorized, APIResponse{Status: "error", Message: "Current password is incorrect"})
		return
	}

	// 生成新密码哈希
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Failed to hash new password: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to process new password"})
		return
	}

	// 更新密码
	if err := UpdateUserPassword(userID, string(hashedPassword)); err != nil {
		log.Printf("Failed to update password: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to update password"})
		return
	}

	writeJSON(w, http.StatusOK, APIResponse{Status: "success", Message: "密码修改成功"})
} 