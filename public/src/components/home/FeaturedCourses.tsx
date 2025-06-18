
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course/CourseCard";

const FeaturedCourses = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "React 全栈开发",
      description: "从零开始学习React，包含hooks、状态管理、路由等核心概念",
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
      description: "深入学习Go语言微服务开发，包含分布式系统设计与实践",
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
      description: "计算机科学基础，提升编程思维和解决问题的能力",
      instructor: "王老师",
      rating: 4.7,
      studentsCount: 2100,
      duration: "45小时",
      price: "¥199",
      originalPrice: "¥399",
      image: "/lovable-uploads/0b48c24a-1af6-45b5-a6c4-81c22acd10af.png",
      level: "初级",
      category: "计算机基础"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">精选课程</h2>
          <p className="text-muted-foreground text-lg">
            由行业专家精心挑选的热门课程
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            查看全部课程
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
