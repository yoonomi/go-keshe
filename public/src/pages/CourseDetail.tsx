
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Star, Users, Clock, BookOpen, Play, Download, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const CourseDetail = () => {
  const { id } = useParams();

  // 模拟课程详细数据
  const course = {
    id: parseInt(id || "1"),
    title: "React 全栈开发完整教程",
    description: "这是一门完整的React全栈开发课程，从基础语法到高级特性，从前端到后端，帮助您成为一名优秀的全栈开发工程师。课程内容包括React Hooks、状态管理、路由系统、服务端渲染、性能优化等核心内容。",
    instructor: "张老师",
    instructorAvatar: "/placeholder.svg",
    instructorBio: "10年前端开发经验，曾在阿里巴巴、腾讯等大厂工作，精通React、Vue、Node.js等技术栈。",
    rating: 4.8,
    studentsCount: 1200,
    duration: "32小时",
    price: "¥299",
    originalPrice: "¥599",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    level: "中级",
    category: "前端开发",
    lastUpdated: "2024年12月",
    language: "中文",
    chapters: [
      {
        id: 1,
        title: "React 基础入门",
        lessons: [
          { id: 1, title: "什么是React", duration: "15分钟", type: "video" },
          { id: 2, title: "创建第一个React应用", duration: "20分钟", type: "video" },
          { id: 3, title: "JSX语法详解", duration: "25分钟", type: "video" },
          { id: 4, title: "实践练习：Todo List", duration: "30分钟", type: "practice" }
        ]
      },
      {
        id: 2,
        title: "组件与Props",
        lessons: [
          { id: 5, title: "函数组件 vs 类组件", duration: "18分钟", type: "video" },
          { id: 6, title: "Props的使用方法", duration: "22分钟", type: "video" },
          { id: 7, title: "组件组合与复用", duration: "28分钟", type: "video" },
          { id: 8, title: "课程资料下载", duration: "5分钟", type: "resource" }
        ]
      },
      {
        id: 3,
        title: "状态管理与Hooks",
        lessons: [
          { id: 9, title: "useState Hook详解", duration: "25分钟", type: "video" },
          { id: 10, title: "useEffect Hook应用", duration: "30分钟", type: "video" },
          { id: 11, title: "自定义Hooks开发", duration: "35分钟", type: "video" },
          { id: 12, title: "Context API使用", duration: "20分钟", type: "video" }
        ]
      }
    ],
    requirements: [
      "具备基础的HTML、CSS、JavaScript知识",
      "了解ES6+语法特性",
      "有一定的编程基础",
      "准备好学习的热情和耐心"
    ],
    features: [
      "32小时高质量视频内容",
      "完整的项目实战案例",
      "配套的学习资料和代码",
      "在线答疑和社区支持",
      "结业证书颁发",
      "终身免费更新"
    ]
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "video": return <Play className="h-4 w-4" />;
      case "practice": return <BookOpen className="h-4 w-4" />;
      case "resource": return <Download className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={() => window.location.href = '/login'}
        onRegisterClick={() => window.location.href = '/register'}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* 课程头部信息 */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground text-lg mb-6">{course.description}</p>
            </div>

            {/* 课程统计 */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span>({course.studentsCount} 学员)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.studentsCount}+ 学员</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div>最后更新：{course.lastUpdated}</div>
            </div>

            {/* 讲师信息 */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">高级前端工程师</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.instructorBio}</p>
              </CardContent>
            </Card>
          </div>

          {/* 课程购买卡片 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/40" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl font-bold text-primary">{course.price}</span>
                  <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                  <Badge variant="destructive">5折</Badge>
                </div>
                
                <Button className="w-full mb-4" size="lg">
                  立即购买
                </Button>
                
                <Button variant="outline" className="w-full mb-6">
                  加入购物车
                </Button>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">课程时长</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">课程语言</span>
                    <span>{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">学习期限</span>
                    <span>终身有效</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">支持设备</span>
                    <span>手机、电脑、平板</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 课程详细内容 */}
        <Tabs defaultValue="curriculum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="curriculum">课程目录</TabsTrigger>
            <TabsTrigger value="description">课程介绍</TabsTrigger>
            <TabsTrigger value="requirements">学习要求</TabsTrigger>
            <TabsTrigger value="reviews">学员评价</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">课程章节</h3>
              <p className="text-muted-foreground">
                共 {course.chapters.length} 章节，{course.chapters.reduce((total, chapter) => total + chapter.lessons.length, 0)} 个课时
              </p>
            </div>
            
            {course.chapters.map((chapter) => (
              <Card key={chapter.id}>
                <CardHeader>
                  <CardTitle className="text-lg">第{chapter.id}章：{chapter.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          {getIcon(lesson.type)}
                          <div>
                            <div className="font-medium">{lesson.title}</div>
                            <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          预览
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="description" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>课程特色</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>学习要求</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>学员评价</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">暂无评价，成为第一个评价的学员吧！</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CourseDetail;
