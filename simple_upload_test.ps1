# 简单的内容上传功能测试
Write-Host "=== 简单内容上传功能测试 ===" -ForegroundColor Green

# 1. 测试健康检查
Write-Host "`n1. 健康检查..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/health" -Method GET
    Write-Host "✅ 服务正常运行" -ForegroundColor Green
} catch {
    Write-Host "❌ 服务连接失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 2. 测试内容列表页面
Write-Host "`n2. 测试内容列表页面..." -ForegroundColor Yellow
try {
    $listResponse = Invoke-WebRequest -Uri "http://localhost:8080/list" -Method GET
    if ($listResponse.StatusCode -eq 200) {
        Write-Host "✅ 内容列表页面访问成功!" -ForegroundColor Green
        Write-Host "   状态码: $($listResponse.StatusCode)"
        
        # 检查页面内容
        $content = $listResponse.Content
        if ($content -like "*最新文章*") {
            Write-Host "   ✅ 页面包含标题" -ForegroundColor Green
        }
        if ($content -like "*游客*") {
            Write-Host "   ✅ 页面包含用户信息" -ForegroundColor Green
        }
        if ($content -like "*暂无内容*") {
            Write-Host "   ✅ 页面显示空内容提示" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "❌ 页面访问失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. 测试上传页面
Write-Host "`n3. 测试上传页面..." -ForegroundColor Yellow
try {
    $uploadPageResponse = Invoke-WebRequest -Uri "http://localhost:8080/static/upload_test.html" -Method GET
    if ($uploadPageResponse.StatusCode -eq 200) {
        Write-Host "✅ 上传页面访问成功!" -ForegroundColor Green
        Write-Host "   状态码: $($uploadPageResponse.StatusCode)"
    }
} catch {
    Write-Host "❌ 上传页面访问失败: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. 测试uploads目录
Write-Host "`n4. 测试uploads目录..." -ForegroundColor Yellow
try {
    $uploadsResponse = Invoke-WebRequest -Uri "http://localhost:8080/uploads/" -Method GET
    Write-Host "✅ uploads目录可访问" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "✅ uploads目录为空（正常）" -ForegroundColor Green
    } else {
        Write-Host "❌ uploads目录访问异常" -ForegroundColor Red
    }
}

Write-Host "`n=== 测试完成 ===" -ForegroundColor Green
Write-Host ""
Write-Host "📝 可用的端点:" -ForegroundColor Cyan
Write-Host "   • http://localhost:8080/list - 内容列表页面"
Write-Host "   • http://localhost:8080/static/upload_test.html - 上传测试页面"
Write-Host "   • http://localhost:8080/api/content/upload - 内容上传API"
Write-Host "   • http://localhost:8080/uploads/ - 上传文件访问" 