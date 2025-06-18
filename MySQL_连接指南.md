# MySQL数据库连接指南

## 1. 使用Docker快速启动MySQL（推荐）

### 启动MySQL容器：
```bash
docker-compose up -d
```

### 检查容器状态：
```bash
docker ps
```

### 连接到MySQL容器：
```bash
docker exec -it final_project_mysql mysql -u appuser -p
# 密码: lappland0e
```

## 2. 手动安装MySQL

### Windows:
1. 下载MySQL Installer: https://dev.mysql.com/downloads/installer/
2. 安装MySQL Server 8.0
3. 设置root密码: `root123`
4. 创建数据库和用户：

```sql
-- 连接到MySQL
mysql -u root -p

-- 创建数据库
CREATE DATABASE final_project_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 创建用户
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'lappland0e';
CREATE USER 'appuser'@'%' IDENTIFIED BY 'lappland0e';

-- 授权
GRANT ALL PRIVILEGES ON final_project_db.* TO 'appuser'@'localhost';
GRANT ALL PRIVILEGES ON final_project_db.* TO 'appuser'@'%';

-- 刷新权限
FLUSH PRIVILEGES;
```

## 3. 环境变量配置

创建 `.env` 文件（在项目根目录）：
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=final_project_db
DB_USER=appuser
DB_PASSWORD=lappland0e
DSN=appuser:lappland0e@tcp(127.0.0.1:3306)/final_project_db?charset=utf8mb4&parseTime=True&loc=Local
```

## 4. 连接字符串格式

```
用户名:密码@tcp(主机:端口)/数据库名?charset=utf8mb4&parseTime=True&loc=Local
```

### 示例：
- 本地MySQL: `appuser:lappland0e@tcp(127.0.0.1:3306)/final_project_db?charset=utf8mb4&parseTime=True&loc=Local`
- 远程MySQL: `appuser:lappland0e@tcp(192.168.1.100:3306)/final_project_db?charset=utf8mb4&parseTime=True&loc=Local`

## 5. 测试连接

### 方法1：运行Go程序
```bash
go run .
```

### 方法2：使用MySQL客户端
```bash
mysql -h 127.0.0.1 -P 3306 -u appuser -p final_project_db
```

### 方法3：使用GUI工具
- MySQL Workbench
- phpMyAdmin
- DataGrip
- Navicat

## 6. 常见问题解决

### 连接被拒绝：
```
dial tcp 127.0.0.1:3306: connect: connection refused
```
**解决方案：** 确保MySQL服务正在运行

### 权限错误：
```
Access denied for user 'appuser'@'localhost'
```
**解决方案：** 检查用户名、密码和权限设置

### 数据库不存在：
```
Unknown database 'final_project_db'
```
**解决方案：** 创建数据库或检查数据库名称

## 7. 生产环境配置建议

### 安全设置：
- 使用强密码
- 限制用户权限
- 使用SSL连接
- 不要在代码中硬编码密码

### 性能优化：
- 调整连接池参数
- 配置适当的超时时间
- 启用查询缓存

### 连接字符串示例（SSL）：
```
appuser:强密码@tcp(主机:3306)/数据库?charset=utf8mb4&parseTime=True&loc=Local&tls=true
```

# 手动配置 MySQL 数据库连接指南

你好！看起来你的电脑上没有安装 Docker，因此无法使用 `docker-compose.yml` 自动配置和启动 MySQL。不过别担心，按照以下步骤手动安装和配置 MySQL，你的 Go 项目一样可以顺利运行。

## 步骤 1: 下载并安装 MySQL

1.  **访问 MySQL 官网**:
    *   打开浏览器，访问 [MySQL Community Server 下载页面](https://dev.mysql.com/downloads/mysql/)。

2.  **选择安装程序**:
    *   在 "MySQL Community Downloads" 页面，选择 "MySQL Installer for Windows"。
    *   推荐下载 `mysql-installer-web-community`（在线安装版）或 `mysql-installer-community`（离线安装版）。离线版更大，但安装时无需联网。

3.  **运行安装程序**:
    *   下载后，双击 `.msi` 文件开始安装。
    *   在 "Choosing a Setup Type"（选择安装类型）页面，选择 **"Custom"**（自定义）并点击 "Next"。

4.  **选择组件**:
    *   在 "Select Products" 页面，你需要选择以下两个核心组件：
        *   **MySQL Server**: 在左侧找到 "MySQL Servers"，展开并选择最新的版本（例如 `MySQL Server 8.0.x`），然后点击绿色箭头将其移动到右侧 "Products To Be Installed" 列表。
        *   **MySQL Workbench**: 这是一个官方的图形化管理工具，非常推荐安装。在 "Applications" -> "MySQL Workbench" 中选择最新版本，并将其移动到右侧。
    *   选择完毕后，点击 "Next"。

5.  **完成安装**:
    *   点击 "Execute" 开始下载和安装。
    *   安装完成后，进入 "Product Configuration"（产品配置）阶段。

## 步骤 2: 配置 MySQL 服务器

1.  **类型和网络 (Type and Networking)**:
    *   保持默认的 "Standalone MySQL Server" 选项。
    *   **Config Type**: 选择 "Development Computer"。
    *   **Port**: 保持默认端口 `3306`。这是我们的Go程序将要连接的端口。
    *   点击 "Next"。

2.  **认证方法 (Authentication Method)**:
    *   选择 **"Use Strong Password Encryption for Authentication"**（推荐）。
    *   点击 "Next"。

3.  **设置 Root 密码 (Accounts and Roles)**:
    *   为 `root` 用户设置一个 **强密码**。**请务必记住这个密码**，后面会用到。
    *   例如，你可以设置为 `your_strong_password`。

4.  **Windows 服务 (Windows Service)**:
    *   保持默认设置，让 MySQL 作为 Windows 服务自动启动。
    *   点击 "Next"。

5.  **应用配置 (Apply Configuration)**:
    *   点击 "Execute"，等待配置步骤完成。
    *   配置完成后，点击 "Finish"。

## 步骤 3: 创建数据库和用户

现在你的 MySQL 已经运行起来了，我们需要为项目创建一个专用的数据库和用户。

1.  **打开 MySQL Workbench**:
    *   从开始菜单找到并打开 `MySQL Workbench`。
    *   在主屏幕上，点击 "Local instance MySQL80" 连接。
    *   输入你刚才为 `root` 用户设置的密码。

2.  **执行 SQL 命令**:
    *   连接成功后，点击 "File" -> "New Query Tab" 打开一个新的查询窗口。
    *   **复制** 以下所有 SQL 命令，**粘贴** 到查询窗口中，然后点击闪电图标 (⚡) 执行它们。

    ```sql
    -- 创建一个专门用于我们项目的数据库
    -- COLLATE utf8mb4_unicode_ci 用于支持中文和表情符号
    CREATE DATABASE IF NOT EXISTS final_project_db COLLATE utf8mb4_unicode_ci;

    -- 创建一个专门的用户，用于连接这个数据库
    -- 将 'your_password' 替换为你想要设置的密码，建议使用强密码
    CREATE USER 'final_project_user'@'localhost' IDENTIFIED BY 'your_password';

    -- 赋予这个用户对新数据库的所有权限
    GRANT ALL PRIVILEGES ON final_project_db.* TO 'final_project_user'@'localhost';

    -- 刷新权限，让更改生效
    FLUSH PRIVILEGES;
    ```

    **重要**:
    *   请将 `'your_password'` 替换成一个你自己设定的密码，例如 `db_password_123`。
    *   **记住** 你创建的数据库名 (`final_project_db`)、用户名 (`final_project_user`) 和密码 (`your_password`)。

## 步骤 4: 修改 Go 项目配置

现在，我们需要告诉 Go 程序如何连接到你刚刚创建的数据库。

1.  **设置环境变量**:
    *   Go 程序通过环境变量 `DATABASE_URL` 读取数据库连接信息。在启动程序前，你需要在 **PowerShell 终端** 中设置这个变量。
    *   打开你的项目文件夹中的 PowerShell 终端。
    *   根据你上一步设置的 `用户名`、`密码` 和 `数据库名`，构建连接字符串。格式如下：
        `"用户名:密码@tcp(主机:端口)/数据库名"`

    *   例如，如果你使用的是我们推荐的名称，并且密码设置为 `db_password_123`，那么连接字符串就是：
        `"final_project_user:db_password_123@tcp(127.0.0.1:3306)/final_project_db"`

    *   在终端中运行以下命令来设置环境变量（**每次打开新终端都需要重新设置**）：

        ```powershell
        $env:DATABASE_URL="final_project_user:db_password_123@tcp(127.0.0.1:3306)/final_project_db"
        ```

        **注意**: 请将 `db_password_123` 替换成你自己的密码。

## 步骤 5: 启动 Go 程序并初始化数据表

1.  **启动 Go 程序**:
    *   在设置完环境变量的同一个终端中，运行启动命令：
        ```powershell
        go run main.go
        ```

2.  **检查输出**:
    *   如果一切顺利，你应该会看到类似以下的输出：
        ```
        CREATE TABLE users ...
        CREATE TABLE contents ...
        数据库连接成功！
        服务器启动在端口 :8080
        ```
    *   如果看到 "数据库连接成功"，恭喜你，所有配置都正确！

3.  **初始化数据表**:
    *   我们的 Go 程序在启动时会打印出 `CREATE TABLE` 语句，但它**不会自动执行**这些语句。
    *   你需要将终端输出的 `CREATE TABLE` 语句复制下来。
    *   回到 **MySQL Workbench** 的查询窗口，粘贴这些 `CREATE TABLE` 语句，并执行它们，以创建 `users` 和 `contents` 两张表。

现在，你的 Go 微服务项目已经完全配置好并连接到本地的 MySQL 数据库了！ 