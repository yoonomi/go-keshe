# 测试内容上传功能
Write-Host "=== 测试内容上传功能 ===" -ForegroundColor Green

# 1. 测试健康检查
Write-Host "`n1. 健康检查..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/health" -Method GET
    Write-Host "✅ 服务状态: " -ForegroundColor Green -NoNewline
    Write-Host "正常"
} catch {
    Write-Host "❌ 服务连接失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. 测试无文件的内容上传
Write-Host "`n2. 测试无文件内容上传..." -ForegroundColor Yellow

# 创建表单数据
$boundary = [System.Guid]::NewGuid().ToString()
$LF = "`r`n"

$bodyLines = @()
$bodyLines += "--$boundary"
$bodyLines += 'Content-Disposition: form-data; name="title"'
$bodyLines += ""
$bodyLines += "测试文章标题"
$bodyLines += "--$boundary"
$bodyLines += 'Content-Disposition: form-data; name="body"'
$bodyLines += ""
$bodyLines += "这是一篇测试文章的内容。文章内容包含多行文字，用于测试文本上传功能。"
$bodyLines += "--$boundary--"

$body = $bodyLines -join $LF

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/content/upload" -Method POST -ContentType "multipart/form-data; boundary=$boundary" -Body $body
    $result = $response.Content | ConvertFrom-Json
    
    if ($result.success) {
        Write-Host "✅ 无文件上传成功!" -ForegroundColor Green
        Write-Host "   内容ID: $($result.data.id)"
        Write-Host "   标题: $($result.data.title)"
        Write-Host "   内容: $($result.data.body)"
    } else {
        Write-Host "❌ 上传失败: $($result.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ 请求失败: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "错误详情: $errorBody" -ForegroundColor Yellow
    }
}

# 3. 测试内容列表页面
Write-Host "`n3. 测试内容列表页面..." -ForegroundColor Yellow
try {
    $listResponse = Invoke-WebRequest -Uri "http://localhost:8080/list" -Method GET
    if ($listResponse.StatusCode -eq 200) {
        Write-Host "✅ 内容列表页面访问成功!" -ForegroundColor Green
        Write-Host "   状态码: $($listResponse.StatusCode)"
        Write-Host "   内容类型: $($listResponse.Headers['Content-Type'])"
        
        # 检查页面是否包含预期内容
        if ($listResponse.Content -like "*最新文章*") {
            Write-Host "   ✅ 页面包含标题" -ForegroundColor Green
        }
        if ($listResponse.Content -like "*游客*") {
            Write-Host "   ✅ 页面包含用户信息" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "❌ 页面访问失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. 测试文件服务
Write-Host "`n4. 测试uploads目录文件服务..." -ForegroundColor Yellow
try {
    # 测试uploads目录访问（即使为空）
    $uploadsResponse = Invoke-WebRequest -Uri "http://localhost:8080/uploads/" -Method GET
    Write-Host "✅ uploads目录文件服务正常!" -ForegroundColor Green
    Write-Host "   状态码: $($uploadsResponse.StatusCode)"
} catch {
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "✅ uploads目录为空（预期行为）" -ForegroundColor Green
    } else {
        Write-Host "❌ uploads目录访问失败: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== 测试完成 ===" -ForegroundColor Green
Write-Host ""
Write-Host "📝 接下来你可以:" -ForegroundColor Cyan
Write-Host "   • 访问 http://localhost:8080/static/upload_test.html 进行可视化上传测试"
Write-Host "   • 访问 http://localhost:8080/list 查看内容列表"
Write-Host "   • 使用 Postman 测试 /api/content/upload 端点" 