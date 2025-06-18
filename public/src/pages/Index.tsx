
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Users, Clock, Star, Search, User, ShoppingCart, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/layout/Navbar";
import CourseCard from "@/components/course/CourseCard";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import StatsSection from "@/components/home/StatsSection";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />
      
      <main>
        <HeroSection onGetStarted={() => setIsRegisterOpen(true)} />
        <StatsSection />
        <FeaturedCourses />
        
        {/* Search Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">探索课程</h2>
              <p className="text-muted-foreground mb-6">
                在我们的课程库中找到适合您的学习内容
              </p>
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="搜索课程..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">热门分类</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "前端开发", count: "45+ 课程", icon: "💻" },
                { name: "后端开发", count: "38+ 课程", icon: "🔧" },
                { name: "数据科学", count: "25+ 课程", icon: "📊" },
                { name: "UI/UX设计", count: "30+ 课程", icon: "🎨" },
              ].map((category) => (
                <Card key={category.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>登录</DialogTitle>
            <DialogDescription>
              请输入您的账号信息登录
            </DialogDescription>
          </DialogHeader>
          <LoginForm onSuccess={() => setIsLoginOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>注册</DialogTitle>
            <DialogDescription>
              创建新账号开始您的学习之旅
            </DialogDescription>
          </DialogHeader>
          <RegisterForm onSuccess={() => setIsRegisterOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
