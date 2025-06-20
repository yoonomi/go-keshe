-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS final_project_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE final_project_db;

-- Users Table - 匹配 Go 代码中的 User 结构
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(100),
    `phone` VARCHAR(20),
    `avatar` VARCHAR(500),
    `bio` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contents Table - 学习内容表
CREATE TABLE `contents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `title` VARCHAR(255) NOT NULL,
    `body` TEXT,
    `image_url` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Courses Table - 课程表
CREATE TABLE `courses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `instructor` VARCHAR(100),
    `image_url` VARCHAR(500),
    `difficulty` ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    `duration` INT DEFAULT 0, -- 课程时长（分钟）
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- User Course Enrollments - 用户课程注册表
CREATE TABLE `user_courses` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `course_id` INT,
    `enrolled_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `progress` DECIMAL(5,2) DEFAULT 0.00, -- 进度百分比
    `completed_at` TIMESTAMP NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_enrollment` (`user_id`, `course_id`)
);

-- 插入一些示例课程数据
INSERT INTO `courses` (`title`, `description`, `instructor`, `difficulty`, `duration`) VALUES
('Go语言基础', '学习Go语言的基本语法和概念', '张老师', 'beginner', 120),
('Web开发实战', '使用Go语言开发Web应用程序', '李老师', 'intermediate', 180),
('数据库设计', '学习关系型数据库设计原理', '王老师', 'intermediate', 150),
('前端开发基础', '学习HTML、CSS、JavaScript基础', '赵老师', 'beginner', 200),
('React进阶', '深入学习React框架和生态系统', '陈老师', 'advanced', 240); 