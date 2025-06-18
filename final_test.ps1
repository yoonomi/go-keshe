# 最终API测试 - 使用正确路径
Write-Host "Final API Test - Correct Paths" -ForegroundColor Green

# 测试注册
Write-Host "`nTesting Registration with /api/v1/register..." -ForegroundColor Yellow
$registerData = @{
    username = "yomi"
    email = "yomi@example.com"
    password = "securepassword123"
}

$registerBody = $registerData | ConvertTo-Json
Write-Host "Request Body: $registerBody"

try {
    $registerResult = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/register" -Method POST -ContentType "application/json" -Body $registerBody
    Write-Host "✅ Registration Success:" -ForegroundColor Green
    Write-Host "Status: $($registerResult.StatusCode)"
    Write-Host "Response: $($registerResult.Content)"
} catch {
    Write-Host "❌ Registration Error:" -ForegroundColor Red
    Write-Host "Exception: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
        $responseStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseStream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
        $reader.Close()
        $responseStream.Close()
    }
}

# 测试登录（正确密码）
Write-Host "`nTesting Login with /api/v1/login (correct password)..." -ForegroundColor Yellow
$loginData = @{
    email = "yomi@example.com"
    password = "securepassword123"
}

$loginBody = $loginData | ConvertTo-Json
Write-Host "Request Body: $loginBody"

try {
    $loginResult = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/login" -Method POST -ContentType "application/json" -Body $loginBody
    Write-Host "✅ Login Success:" -ForegroundColor Green
    Write-Host "Status: $($loginResult.StatusCode)"
    Write-Host "Response: $($loginResult.Content)"
} catch {
    Write-Host "❌ Login Error:" -ForegroundColor Red
    Write-Host "Exception: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
        $responseStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseStream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
        $reader.Close()
        $responseStream.Close()
    }
}

# 测试登录（错误密码）
Write-Host "`nTesting Login with wrong password..." -ForegroundColor Yellow
$wrongLoginData = @{
    email = "yomi@example.com"
    password = "wrongpassword"
}

$wrongLoginBody = $wrongLoginData | ConvertTo-Json
Write-Host "Request Body: $wrongLoginBody"

try {
    $wrongLoginResult = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/login" -Method POST -ContentType "application/json" -Body $wrongLoginBody
    Write-Host "⚠️ Unexpected Success:" -ForegroundColor Red
    Write-Host "Status: $($wrongLoginResult.StatusCode)"
    Write-Host "Response: $($wrongLoginResult.Content)"
} catch {
    Write-Host "✅ Expected Error (wrong password):" -ForegroundColor Yellow
    Write-Host "Exception: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        Write-Host "Status: $($_.Exception.Response.StatusCode)"
        $responseStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseStream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
        $reader.Close()
        $responseStream.Close()
    }
}

Write-Host "`n🎉 Test completed!" -ForegroundColor Green 