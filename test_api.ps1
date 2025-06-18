# API测试脚本
Write-Host "=== 测试用户注册和登录 API ===" -ForegroundColor Green

# 测试健康检查
Write-Host "`n1. 测试健康检查..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/health" -Method GET
    Write-Host "健康检查成功: " -ForegroundColor Green -NoNewline
    Write-Host $healthResponse.StatusCode
} catch {
    Write-Host "健康检查失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 测试用户注册
Write-Host "`n2. 测试用户注册..." -ForegroundColor Yellow
$registerData = @{
    username = "yomi"
    email = "yomi@example.com"
    password = "securepassword123"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/register" -Method POST -ContentType "application/json" -Body $registerData
    Write-Host "注册成功: " -ForegroundColor Green -NoNewline
    Write-Host $registerResponse.Content
} catch {
    Write-Host "注册响应: " -ForegroundColor Blue -NoNewline
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $responseBody = $reader.ReadToEnd()
        Write-Host $responseBody
    } else {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

# 测试用户登录 (正确密码)
Write-Host "`n3. 测试用户登录（正确密码）..." -ForegroundColor Yellow
$loginData = @{
    email = "yomi@example.com"
    password = "securepassword123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/login" -Method POST -ContentType "application/json" -Body $loginData
    Write-Host "登录成功: " -ForegroundColor Green -NoNewline
    Write-Host $loginResponse.Content
} catch {
    Write-Host "登录响应: " -ForegroundColor Blue -NoNewline
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $responseBody = $reader.ReadToEnd()
        Write-Host $responseBody
    } else {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

# 测试用户登录 (错误密码)
Write-Host "`n4. 测试用户登录（错误密码）..." -ForegroundColor Yellow
$wrongLoginData = @{
    email = "yomi@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $wrongLoginResponse = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/login" -Method POST -ContentType "application/json" -Body $wrongLoginData
    Write-Host "意外成功: " -ForegroundColor Red -NoNewline
    Write-Host $wrongLoginResponse.Content
} catch {
    Write-Host "期望的错误响应: " -ForegroundColor Blue -NoNewline
    if ($_.Exception.Response) {
        $errorResponse = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorResponse)
        $responseBody = $reader.ReadToEnd()
        Write-Host $responseBody
    } else {
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host "`n=== 测试完成 ===" -ForegroundColor Green 