# Final Project - Go 微服务项目

这是一个基于 Go 语言开发的微服务项目，提供用户管理和内容管理功能。

## 🚀 技术栈

- **语言**: Go 1.19+
- **HTTP路由**: Gorilla Mux
- **数据库**: MySQL
- **密码加密**: bcrypt
- **前端**: HTML + CSS + JavaScript

## 📁 项目结构

```
final-project/
├── go.mod                  # Go模块定义
├── go.sum                  # 依赖版本锁定
├── main.go                 # 程序入口和路由配置
├── handlers_user.go        # 用户相关HTTP处理器
├── handlers_content.go     # 内容相关HTTP处理器
├── database.go             # 数据库连接与操作
├── models.go               # 数据结构定义
├── templates/              # Go HTML模板
│   └── index.html
├── public/                 # 静态文件
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
└── uploads/                # 用户上传文件目录
```

## 🛠️ 安装和运行

### 1. 环境要求

- Go 1.19 或更高版本
- MySQL 5.7 或更高版本

### 2. 克隆项目

```bash
git clone <repository-url>
cd final-project
```

### 3. 安装依赖

```bash
go mod tidy
```

### 4. 配置数据库

1. 启动 MySQL 服务
2. 创建数据库：
```sql
CREATE DATABASE final_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. 修改 `database.go` 中的数据库连接信息：
```go
dsn := "用户名:密码@tcp(localhost:3306)/final_project?charset=utf8mb4&parseTime=True&loc=Local"
```

### 5. 运行项目

```bash
go run .
```

服务将在 `http://localhost:8080` 启动

## 📋 API 端点

### 用户管理

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/v1/users/register` | 用户注册 |
| POST | `/api/v1/users/login` | 用户登录 |
| GET | `/api/v1/users` | 获取用户列表 |
| GET | `/api/v1/users/{id}` | 获取用户详情 |
| GET | `/api/v1/users/profile` | 获取当前用户资料 |

### 内容管理

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/api/v1/contents` | 创建内容 |
| GET | `/api/v1/contents` | 获取内容列表 |
| GET | `/api/v1/contents/{id}` | 获取内容详情 |
| PUT | `/api/v1/contents/{id}` | 更新内容 |
| DELETE | `/api/v1/contents/{id}` | 删除内容 |

### 其他

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/v1/health` | 健康检查 |
| POST | `/api/v1/upload` | 文件上传 |

## 🔧 API 使用示例

### 用户注册

```bash
curl -X POST http://localhost:8080/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 用户登录

```bash
curl -X POST http://localhost:8080/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 创建内容

```bash
curl -X POST http://localhost:8080/api/v1/contents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "测试标题",
    "body": "测试内容正文",
    "status": "published"
  }'
```

### 获取内容列表

```bash
curl http://localhost:8080/api/v1/contents?limit=10&offset=0
```

## 🗃️ 数据库表结构

### users 表

| 字段 | 类型 | 描述 |
|------|------|------|
| id | INT | 主键，自增 |
| username | VARCHAR(50) | 用户名，唯一 |
| email | VARCHAR(100) | 邮箱，唯一 |
| password | VARCHAR(255) | 加密密码 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### contents 表

| 字段 | 类型 | 描述 |
|------|------|------|
| id | INT | 主键，自增 |
| title | VARCHAR(255) | 标题 |
| body | TEXT | 内容正文 |
| user_id | INT | 用户ID，外键 |
| status | ENUM | 状态：draft/published/archived |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 🎯 功能特性

- ✅ 用户注册和登录
- ✅ 密码加密存储
- ✅ 内容管理 (CRUD)
- ✅ 数据库连接池
- ✅ HTTP中间件 (日志、CORS)
- ✅ 错误处理
- ✅ 健康检查
- ✅ 静态文件服务
- ✅ 响应式前端界面

## 🔍 开发说明

### 环境变量

可以通过环境变量配置端口：

```bash
export PORT=3000
go run .
```

### 日志

应用会输出详细的请求日志，包括：
- 客户端IP
- HTTP方法
- 请求路径
- 响应状态

### 中间件

项目包含以下中间件：
- **日志中间件**: 记录所有HTTP请求
- **CORS中间件**: 处理跨域请求

## 🚧 待完善功能

- [ ] JWT身份验证
- [ ] 用户权限管理
- [ ] 文件上传功能
- [ ] 数据验证
- [ ] 单元测试
- [ ] API文档 (Swagger)
- [ ] Docker部署
- [ ] 缓存机制

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系方式

如有问题，请联系项目维护者。 