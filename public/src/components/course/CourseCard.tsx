
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  duration: string;
  price: string;
  originalPrice?: string;
  image: string;
  level: string;
  category: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // 如果图片加载失败，显示占位符
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 hidden items-center justify-center">
            <BookOpen className="h-16 w-16 text-primary/40" />
          </div>
        </AspectRatio>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>
        
        <Link to={`/course/${course.id}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer">
            {course.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="text-sm text-muted-foreground mb-4">
          讲师：{course.instructor}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.studentsCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {course.originalPrice}
              </span>
            )}
          </div>
          <Link to={`/course/${course.id}`}>
            <Button size="sm">
              立即学习
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
