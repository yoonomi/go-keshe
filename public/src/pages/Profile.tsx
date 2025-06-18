
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Settings, Trophy, Clock, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "张学习",
    email: "zhang@example.com",
    phone: "138****8888",
    joinDate: "2024年1月",
    bio: "热爱学习的程序员"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // 模拟用户课程数据
  const myCourses = [
    {
      id: 1,
      title: "React 全栈开发",
      progress: 75,
      instructor: "张老师",
      status: "学习中",
      lastStudied: "2024-12-10",
      totalLessons: 24,
      completedLessons: 18
    },
    {
      id: 2,
      title: "数据结构与算法",
      progress: 100,
      instructor: "王老师",
      status: "已完成",
      lastStudied: "2024-11-28",
      totalLessons: 32,
      completedLessons: 32
    },
    {
      id: 3,
      title: "Python 数据分析",
      progress: 45,
      instructor: "赵老师",
      status: "学习中",
      lastStudied: "2024-12-08",
      totalLessons: 20,
      completedLessons: 9
    }
  ];

  const handleUpdateProfile = () => {
    toast({
      title: "信息更新成功",
      description: "您的个人信息已成功更新",
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "密码修改失败",
        description: "两次输入的新密码不一致",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "密码修改成功",
      description: "您的密码已成功修改",
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "已完成":
        return <Badge variant="secondary">已完成</Badge>;
      case "学习中":
        return <Badge>学习中</Badge>;
      default:
        return <Badge variant="outline">未开始</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={() => window.location.href = '/login'}
        onRegisterClick={() => window.location.href = '/register'}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 用户信息侧边栏 */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>{userInfo.username}</CardTitle>
                <CardDescription>{userInfo.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">加入时间</div>
                  <div className="font-medium">{userInfo.joinDate}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{myCourses.length}</div>
                    <div className="text-sm text-muted-foreground">已购课程</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {myCourses.filter(c => c.status === "已完成").length}
                    </div>
                    <div className="text-sm text-muted-foreground">已完成</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 主要内容区域 */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="courses" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="courses">我的课程</TabsTrigger>
                <TabsTrigger value="profile">个人信息</TabsTrigger>
                <TabsTrigger value="security">安全设置</TabsTrigger>
              </TabsList>

              {/* 我的课程 */}
              <TabsContent value="courses" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">我的课程</h2>
                  <div className="space-y-4">
                    {myCourses.map((course) => (
                      <Card key={course.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">{course.title}</h3>
                                {getStatusBadge(course.status)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                讲师：{course.instructor}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                最后学习：{course.lastStudied}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              继续学习
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>学习进度</span>
                              <span>{course.completedLessons}/{course.totalLessons} 课时</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                            <div className="text-right text-sm text-muted-foreground">
                              {course.progress}% 完成
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* 个人信息 */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>个人信息</CardTitle>
                    <CardDescription>
                      管理您的个人资料和联系信息
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">用户名</Label>
                        <Input
                          id="username"
                          value={userInfo.username}
                          onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">邮箱</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号</Label>
                      <Input
                        id="phone"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">个人简介</Label>
                      <Input
                        id="bio"
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                        placeholder="介绍一下自己..."
                      />
                    </div>

                    <Button onClick={handleUpdateProfile}>
                      保存更改
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 安全设置 */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>修改密码</CardTitle>
                    <CardDescription>
                      为了账户安全，请定期更换密码
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">当前密码</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
                        >
                          {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">新密码</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPassword.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                        >
                          {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">确认新密码</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPassword.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                        >
                          {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button onClick={handleChangePassword}>
                      修改密码
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
