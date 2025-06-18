# 使用正确的API端点测试
Write-Host "Testing with correct endpoints" -ForegroundColor Green

# 1. 测试健康检查
Write-Host "`n1. Health Check (correct endpoint):" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/health" -Method GET
    Write-Host "Health Status: OK" -ForegroundColor Green
    $health | ConvertTo-Json
} catch {
    Write-Host "Health Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. 测试注册（正确端点）
Write-Host "`n2. User Registration (correct endpoint /api/register):" -ForegroundColor Yellow
$registerData = @{
    username = "testuser"
    email = "test@example.com"
    password = "password123"
}

$registerBody = $registerData | ConvertTo-Json
Write-Host "Register Request: $registerBody"

try {
    $registerResult = Invoke-WebRequest -Uri "http://localhost:8080/api/register" -Method POST -ContentType "application/json" -Body $registerBody
    Write-Host "Registration Success:" -ForegroundColor Green
    Write-Host "Status: $($registerResult.StatusCode)"
    Write-Host "Content: $($registerResult.Content)"
} catch {
    Write-Host "Registration Error:" -ForegroundColor Red
    Write-Host "Exception: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
        $responseStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseStream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody"
        $reader.Close()
        $responseStream.Close()
    }
}

# 3. 测试登录（正确端点）
Write-Host "`n3. User Login (correct endpoint /api/login):" -ForegroundColor Yellow
$loginData = @{
    email = "test@example.com"
    password = "password123"
}

$loginBody = $loginData | ConvertTo-Json
Write-Host "Login Request: $loginBody"

try {
    $loginResult = Invoke-WebRequest -Uri "http://localhost:8080/api/login" -Method POST -ContentType "application/json" -Body $loginBody
    Write-Host "Login Success:" -ForegroundColor Green
    Write-Host "Status: $($loginResult.StatusCode)"
    Write-Host "Content: $($loginResult.Content)"
} catch {
    Write-Host "Login Error:" -ForegroundColor Red
    Write-Host "Exception: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
        $responseStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseStream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody"
        $reader.Close()
        $responseStream.Close()
    }
}

Write-Host "`nTest completed!" -ForegroundColor Green 