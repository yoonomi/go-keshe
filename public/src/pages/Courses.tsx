
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import CourseCard from "@/components/course/CourseCard";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // 模拟课程数据
  const allCourses = [
    {
      id: 1,
      title: "React 全栈开发",
      description: "从零开始学习React，包含hooks、状态管理、路由等核心概念，适合有一定JavaScript基础的开发者",
      instructor: "张老师",
      rating: 4.8,
      studentsCount: 1200,
      duration: "32小时",
      price: "¥299",
      originalPrice: "¥599",
      image: "/lovable-uploads/a36d9cda-d8a8-477e-b575-59560977a8e8.png",
      level: "中级",
      category: "前端开发"
    },
    {
      id: 2,
      title: "Go 微服务架构",
      description: "深入学习Go语言微服务开发，包含分布式系统设计与实践，掌握现代后端开发技术",
      instructor: "李老师",
      rating: 4.9,
      studentsCount: 850,
      duration: "28小时",
      price: "¥399",
      originalPrice: "¥799",
      image: "/lovable-uploads/88520021-c732-4450-a78c-43837e4ff97b.png",
      level: "高级",
      category: "后端开发"
    },
    {
      id: 3,
      title: "数据结构与算法",
      description: "计算机科学基础，提升编程思维和解决问题的能力，为技术面试和职业发展打下坚实基础",
      instructor: "王老师",
      rating: 4.7,
      studentsCount: 2100,
      duration: "45小时",
      price: "¥199",
      originalPrice: "¥399",
      image: "/lovable-uploads/0b48c24a-1af6-45b5-a6c4-81c22acd10af.png",
      level: "初级",
      category: "计算机基础"
    },
    {
      id: 4,
      title: "Python 数据分析",
      description: "使用Python进行数据分析，学习pandas、numpy、matplotlib等核心库的使用",
      instructor: "赵老师",
      rating: 4.6,
      studentsCount: 980,
      duration: "24小时",
      price: "¥259",
      originalPrice: "¥459",
      image: "/lovable-uploads/cfe7cfc8-c3ee-4eee-b53b-aabc24ff369d.png",
      level: "中级",
      category: "数据科学"
    },
    {
      id: 5,
      title: "UI/UX 设计实战",
      description: "从设计理论到实际项目，学习用户体验设计的完整流程和设计工具的使用",
      instructor: "刘老师",
      rating: 4.5,
      studentsCount: 756,
      duration: "18小时",
      price: "¥199",
      originalPrice: "¥359",
      image: "/lovable-uploads/9607f641-a178-4500-9d64-ce78f310be47.png",
      level: "初级",
      category: "设计"
    },
    {
      id: 6,
      title: "Vue.js 企业级开发",
      description: "Vue3 + TypeScript + Vite 企业级项目开发，包含组件设计、状态管理、性能优化",
      instructor: "陈老师",
      rating: 4.8,
      studentsCount: 1156,
      duration: "36小时",
      price: "¥329",
      originalPrice: "¥629",
      image: "/lovable-uploads/a55dfee9-2191-4acc-9f0c-997461699239.png",
      level: "高级",
      category: "前端开发"
    }
  ];

  // 过滤课程
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={() => window.location.href = '/login'}
        onRegisterClick={() => window.location.href = '/register'}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">所有课程</h1>
          <p className="text-muted-foreground text-lg">
            发现适合您的优质课程，开始您的学习之旅
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="搜索课程名称或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* 分类筛选 */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                <SelectItem value="前端开发">前端开发</SelectItem>
                <SelectItem value="后端开发">后端开发</SelectItem>
                <SelectItem value="数据科学">数据科学</SelectItem>
                <SelectItem value="计算机基础">计算机基础</SelectItem>
                <SelectItem value="设计">设计</SelectItem>
              </SelectContent>
            </Select>

            {/* 难度筛选 */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="选择难度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部难度</SelectItem>
                <SelectItem value="初级">初级</SelectItem>
                <SelectItem value="中级">中级</SelectItem>
                <SelectItem value="高级">高级</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 课程列表 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* 没有找到课程 */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">没有找到相关课程</h3>
            <p className="text-muted-foreground">
              请尝试调整搜索关键词或筛选条件
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
