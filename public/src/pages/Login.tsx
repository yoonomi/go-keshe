
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const handleLoginSuccess = () => {
    // 登录成功后跳转到首页
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">学习平台</span>
          </Link>
        </div>

        {/* 登录卡片 */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">欢迎回来</CardTitle>
            <CardDescription>
              请登录您的账号以继续学习
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={handleLoginSuccess} />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                还没有账号？{" "}
                <Link to="/register" className="font-medium text-primary hover:underline">
                  立即注册
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 返回首页 */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
