
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              开启您的
              <span className="text-primary"> 学习之旅</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              探索数千门高质量在线课程，由行业专家精心打造，助您掌握最新技能
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onGetStarted}>
                开始学习
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-5 w-5" />
                观看介绍
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8">
              <div className="bg-background rounded-2xl p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-4 bg-secondary/20 rounded w-1/2"></div>
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-primary/20 rounded w-1/3"></div>
                    <div className="h-8 bg-primary rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
