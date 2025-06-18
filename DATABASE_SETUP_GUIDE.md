共# MySQL 数据库连接指南

## ✅ 数据库连接已成功设置！

### 当前配置状态
- 🟢 **Docker Desktop**: 已安装并运行
- 🟢 **MySQL 容器**: 正在端口 3308 上运行
- 🟢 **数据库连接**: Go 应用成功连接
- 🟢 **数据表**: users 和 contents 表已创建
- 🟢 **API 测试**: 注册和登录功能正常

---

## 数据库配置信息

### Docker 容器信息
```yaml
容器名称: final-project-mysql
镜像: mysql:8.0
端口映射: 3308:3306 (宿主机:容器)
状态: 健康运行中
```

### 数据库连接信息
```
主机: localhost
端口: 3308
数据库名: final_project_db
用户名: user
密码: password
根密码: rootpassword
```

### 连接字符串
```
DSN: user:password@tcp(127.0.0.1:3308)/final_project_db?parseTime=true
```

---

## 数据库表结构

### users 表
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);
```

### contents 表
```sql
CREATE TABLE contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    author_id INT NOT NULL,
    image_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_author (author_id),
    INDEX idx_created_at (created_at)
);
```

---

## 常用操作命令

### Docker 容器管理
```bash
# 启动容器
docker-compose -p final-project up -d

# 停止容器
docker-compose -p final-project down

# 查看容器状态
docker ps

# 查看容器日志
docker logs final-project-mysql
```

### 数据库操作
```bash
# 连接到 MySQL 容器
docker exec -it final-project-mysql mysql -u user -ppassword final_project_db

# 执行 SQL 查询
docker exec -it final-project-mysql mysql -u user -ppassword -e "SELECT * FROM final_project_db.users;"

# 备份数据库
docker exec final-project-mysql mysqldump -u user -ppassword final_project_db > backup.sql

# 恢复数据库
Get-Content backup.sql | docker exec -i final-project-mysql mysql -u user -ppassword final_project_db
```

---

## 测试验证

### 1. 测试数据库连接
```bash
go run .
# 查看服务器日志，应显示 "Successfully connected to the database!"
```

### 2. 测试用户注册
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/register" -Method POST -ContentType "application/json" -Body '{"username":"newuser","email":"new@example.com","password":"password123"}'
```

### 3. 测试用户登录
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/login" -Method POST -ContentType "application/json" -Body '{"email":"new@example.com","password":"password123"}'
```

### 4. 验证数据存储
```bash
docker exec -it final-project-mysql mysql -u user -ppassword -e "SELECT id, username, email, created_at FROM final_project_db.users;"
```

---

## 当前测试数据

### 已创建的测试用户
- **用户ID**: 1
- **用户名**: testuser
- **邮箱**: test@example.com
- **创建时间**: 2025-06-17 16:43:19
- **状态**: ✅ 注册和登录测试通过

---

## 故障排除

### 常见问题

#### 1. 端口冲突
**问题**: `port is already allocated`
**解决**: 修改 docker-compose.yml 中的端口映射
```yaml
ports:
  - "3309:3306"  # 使用其他端口
```

#### 2. 容器启动失败
**检查**: 
```bash
docker logs final-project-mysql
```

#### 3. 数据库连接失败
**检查**:
- 容器是否运行: `docker ps`
- 端口是否正确: 检查 database.go 中的 DSN
- 数据库是否健康: `docker exec final-project-mysql mysqladmin ping -h localhost`

#### 4. 权限问题
**解决**: 使用 root 用户连接
```bash
docker exec -it final-project-mysql mysql -u root -prootpassword
```

---

## 生产环境建议

### 安全设置
1. 使用强密码
2. 创建专用数据库用户
3. 限制网络访问
4. 启用 SSL 连接
5. 定期备份数据

### 性能优化
1. 调整 MySQL 配置参数
2. 创建合适的索引
3. 监控查询性能
4. 配置连接池参数

---

## 环境变量配置

可以通过环境变量自定义数据库连接：

```bash
# Windows PowerShell
$env:DSN = "user:password@tcp(127.0.0.1:3308)/final_project_db?parseTime=true"

# Linux/Mac
export DSN="user:password@tcp(127.0.0.1:3308)/final_project_db?parseTime=true"
```

---

## 🎉 总结

✅ **MySQL 数据库已成功设置并连接！**

- Docker 容器正常运行在端口 3308
- Go 应用程序成功连接数据库
- 用户注册和登录功能正常工作
- 数据正确存储在数据库中
- 所有 API 端点正常响应

**下一步可以**:
1. 开发更多业务功能
2. 添加数据验证和安全措施
3. 实现内容管理功能
4. 部署到生产环境 