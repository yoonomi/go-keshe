# 调试API响应
Write-Host "Debug API Test" -ForegroundColor Green

# 测试注册
Write-Host "`nTesting Registration..." -ForegroundColor Yellow

$headers = @{
    'Content-Type' = 'application/json'
}

$body = @{
    username = "debuguser"
    email = "debug@example.com"
    password = "password123"
} | ConvertTo-Json

Write-Host "Request Body: $body"

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/register" -Method POST -Headers $headers -Body $body
    Write-Host "Success Response:"
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Content: $($response.Content)"
} catch {
    Write-Host "Error Response:"
    Write-Host "Exception: $($_.Exception.Message)"
    
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
        Write-Host "Status Description: $($_.Exception.Response.StatusDescription)"
        
        $responseStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseStream)
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
        $reader.Close()
        $responseStream.Close()
    }
} 