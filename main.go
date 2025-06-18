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

	log.Println("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) UNIQUE, email VARCHAR(100) UNIQUE, password_hash VARCHAR(255), full_name VARCHAR(100), phone VARCHAR(20), avatar VARCHAR(500), bio TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);")

	r := mux.NewRouter()

	// 应用 CORS 中间件
	r.Use(corsMiddleware)

	// API 路由
	r.HandleFunc("/health", healthHandler).Methods("GET")
	r.HandleFunc("/api/register", RegisterHandler).Methods("POST")
	r.HandleFunc("/api/login", LoginHandler).Methods("POST")
	r.HandleFunc("/api/users/{id}", GetUserProfileHandler).Methods("GET")
	r.HandleFunc("/api/users/{id}", UpdateUserProfileHandler).Methods("PUT")
	r.HandleFunc("/api/users/{id}/password", ChangePasswordHandler).Methods("PUT")

	// 静态文件服务
	r.PathPrefix("/public/").Handler(http.StripPrefix("/public/", http.FileServer(http.Dir("./public/"))))

	// SPA路由 - 必须放在最后
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./public/app.html")
	})

	log.Println("Server is starting on port 8081...")
	log.Fatal(http.ListenAndServe(":8081", r))
}

 