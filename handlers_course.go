package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)



// GetCoursesHandler 获取所有课程
func GetCoursesHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	
	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	query := `SELECT id, title, description, instructor, 
			  COALESCE(image_url, '') as image_url, 
			  difficulty, duration, created_at, updated_at 
			  FROM courses ORDER BY created_at DESC`
	
	rows, err := GetDB().Query(query)
	if err != nil {
		log.Printf("Failed to fetch courses: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to fetch courses"})
		return
	}
	defer rows.Close()

	var courses []Course
	for rows.Next() {
		var course Course
		err := rows.Scan(&course.ID, &course.Title, &course.Description, &course.Instructor,
			&course.ImageURL, &course.Difficulty, &course.Duration, &course.CreatedAt, &course.UpdatedAt)
		if err != nil {
			log.Printf("Failed to scan course: %v", err)
			continue
		}
		courses = append(courses, course)
	}

	writeJSON(w, http.StatusOK, APIResponse{
		Status: "success",
		Data:   courses,
	})
}

// EnrollCourseHandler 用户选课
func EnrollCourseHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	
	vars := mux.Vars(r)
	userIDStr := vars["userId"]
	courseIDStr := vars["courseId"]
	
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid user ID"})
		return
	}
	
	courseID, err := strconv.Atoi(courseIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid course ID"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	// 检查是否已经选过这门课
	var count int
	err = GetDB().QueryRow("SELECT COUNT(*) FROM user_courses WHERE user_id = ? AND course_id = ?", userID, courseID).Scan(&count)
	if err != nil {
		log.Printf("Failed to check enrollment: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to check enrollment"})
		return
	}
	
	if count > 0 {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "您已经选择了这门课程"})
		return
	}

	// 添加选课记录
	query := `INSERT INTO user_courses (user_id, course_id, enrolled_at, progress) VALUES (?, ?, NOW(), 0.0)`
	_, err = GetDB().Exec(query, userID, courseID)
	if err != nil {
		log.Printf("Failed to enroll course: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to enroll course"})
		return
	}

	writeJSON(w, http.StatusOK, APIResponse{Status: "success", Message: "选课成功！"})
}

// GetUserCoursesHandler 获取用户的选课列表
func GetUserCoursesHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	
	vars := mux.Vars(r)
	userIDStr := vars["userId"]
	
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid user ID"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	query := `SELECT uc.id, uc.user_id, uc.course_id, uc.enrolled_at, uc.progress, uc.completed_at,
			  c.title, c.description, c.instructor, COALESCE(c.image_url, '') as image_url, 
			  c.difficulty, c.duration, c.created_at, c.updated_at
			  FROM user_courses uc
			  JOIN courses c ON uc.course_id = c.id
			  WHERE uc.user_id = ?
			  ORDER BY uc.enrolled_at DESC`
	
	rows, err := GetDB().Query(query, userID)
	if err != nil {
		log.Printf("Failed to fetch user courses: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to fetch courses"})
		return
	}
	defer rows.Close()

	var userCourses []UserCourse
	for rows.Next() {
		var uc UserCourse
		var completedAt *time.Time
		err := rows.Scan(&uc.ID, &uc.UserID, &uc.CourseID, &uc.EnrolledAt, &uc.Progress, &completedAt,
			&uc.Course.Title, &uc.Course.Description, &uc.Course.Instructor, &uc.Course.ImageURL,
			&uc.Course.Difficulty, &uc.Course.Duration, &uc.Course.CreatedAt, &uc.Course.UpdatedAt)
		if err != nil {
			log.Printf("Failed to scan user course: %v", err)
			continue
		}
		uc.CompletedAt = completedAt
		uc.Course.ID = uc.CourseID
		userCourses = append(userCourses, uc)
	}

	writeJSON(w, http.StatusOK, APIResponse{
		Status: "success",
		Data:   userCourses,
	})
}

// UpdateCourseProgressHandler 更新课程进度
func UpdateCourseProgressHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	
	vars := mux.Vars(r)
	userIDStr := vars["userId"]
	courseIDStr := vars["courseId"]
	
	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid user ID"})
		return
	}
	
	courseID, err := strconv.Atoi(courseIDStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid course ID"})
		return
	}

	var req struct {
		Progress float64 `json:"progress"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, APIResponse{Status: "error", Message: "Invalid request body"})
		return
	}

	if GetDB() == nil {
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Database not connected"})
		return
	}

	// 更新进度
	query := `UPDATE user_courses SET progress = ?, updated_at = NOW() WHERE user_id = ? AND course_id = ?`
	if req.Progress >= 100.0 {
		query = `UPDATE user_courses SET progress = ?, completed_at = NOW(), updated_at = NOW() WHERE user_id = ? AND course_id = ?`
	}
	
	_, err = GetDB().Exec(query, req.Progress, userID, courseID)
	if err != nil {
		log.Printf("Failed to update course progress: %v", err)
		writeJSON(w, http.StatusInternalServerError, APIResponse{Status: "error", Message: "Failed to update progress"})
		return
	}

	writeJSON(w, http.StatusOK, APIResponse{Status: "success", Message: "进度更新成功"})
} 