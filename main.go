package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	w.Header().Set("Content-Type", "application/json")
	if GetDB() == nil {
		w.WriteHeader(http.StatusServiceUnavailable)
		w.Write([]byte(`{"status": "error", "message": "Database not connected"}`))
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "ok", "message": "Service is running"}`))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	InitDB()

	r := mux.NewRouter()

	// 应用 CORS 中间件
	r.Use(corsMiddleware)

	// API 路由 - 使用更严格的匹配
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/register", RegisterHandler).Methods("POST")
	api.HandleFunc("/login", LoginHandler).Methods("POST")
	api.HandleFunc("/users/{id:[0-9]+}", GetUserProfileHandler).Methods("GET")
	api.HandleFunc("/users/{id:[0-9]+}", UpdateUserProfileHandler).Methods("PUT")
	api.HandleFunc("/users/{id:[0-9]+}/password", ChangePasswordHandler).Methods("PUT")
	
	// 课程相关API
	api.HandleFunc("/courses", GetCoursesHandler).Methods("GET")
	api.HandleFunc("/users/{userId:[0-9]+}/courses", GetUserCoursesHandler).Methods("GET")
	api.HandleFunc("/users/{userId:[0-9]+}/courses/{courseId:[0-9]+}", EnrollCourseHandler).Methods("POST")
	api.HandleFunc("/users/{userId:[0-9]+}/courses/{courseId:[0-9]+}/progress", UpdateCourseProgressHandler).Methods("PUT")

	// 健康检查
	r.HandleFunc("/health", healthHandler).Methods("GET")

	// 静态文件服务
	r.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public/"))))

	// SPA路由 - 必须放在最后
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/app.html")
	})

	log.Println("Server is starting on port 8081...")
	log.Fatal(http.ListenAndServe(":8081", r))
}

 