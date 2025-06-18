
import { BookOpen, Users, Award, Clock } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: BookOpen,
      value: "1000+",
      label: "优质课程",
      description: "涵盖各个技术领域"
    },
    {
      icon: Users,
      value: "50K+",
      label: "学习者",
      description: "活跃的学习社区"
    },
    {
      icon: Award,
      value: "95%",
      label: "完成率",
      description: "学员满意度"
    },
    {
      icon: Clock,
      value: "24/7",
      label: "随时学习",
      description: "不受时间限制"
    }
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
