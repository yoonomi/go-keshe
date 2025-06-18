# 简单的API测试
Write-Host "Testing API endpoints..." -ForegroundColor Green

# 1. 测试健康检查
Write-Host "`n1. Health Check:"
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/health" -Method GET
    Write-Host "Status: OK" -ForegroundColor Green
    $health | ConvertTo-Json
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. 测试注册
Write-Host "`n2. User Registration:"
$registerData = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
}

try {
    $registerResult = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/register" -Method POST -ContentType "application/json" -Body ($registerData | ConvertTo-Json)
    Write-Host "Registration Response:" -ForegroundColor Green
    $registerResult | ConvertTo-Json
} catch {
    Write-Host "Registration Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Body: $errorBody" -ForegroundColor Yellow
    }
}

# 3. 测试登录 (正确密码)
Write-Host "`n3. User Login (correct password):"
$loginData = @{
    email = "test@example.com"
    password = "password123"
}

try {
    $loginResult = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/login" -Method POST -ContentType "application/json" -Body ($loginData | ConvertTo-Json)
    Write-Host "Login Response:" -ForegroundColor Green
    $loginResult | ConvertTo-Json
} catch {
    Write-Host "Login Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Body: $errorBody" -ForegroundColor Yellow
    }
}

# 4. 测试登录 (错误密码)
Write-Host "`n4. User Login (wrong password):"
$wrongLoginData = @{
    email = "test@example.com"
    password = "wrongpassword"
}

try {
    $wrongLoginResult = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/login" -Method POST -ContentType "application/json" -Body ($wrongLoginData | ConvertTo-Json)
    Write-Host "Unexpected Success:" -ForegroundColor Red
    $wrongLoginResult | ConvertTo-Json
} catch {
    Write-Host "Expected Error:" -ForegroundColor Yellow
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Body: $errorBody" -ForegroundColor Yellow
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nTesting completed!" -ForegroundColor Green 