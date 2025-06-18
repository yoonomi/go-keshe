
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, User, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Navbar = ({ onLoginClick, onRegisterClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "首页", href: "/" },
    { label: "课程", href: "/courses" },
    { label: "个人中心", href: "/profile" },
    { label: "上传内容", href: "/upload" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">学习平台</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-foreground hover:text-primary transition-colors ${
                  isActive(item.href) ? 'text-primary font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={onLoginClick}>
              <User className="h-4 w-4 mr-2" />
              登录
            </Button>
            <Button onClick={onRegisterClick}>
              注册
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-left">菜单</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`text-foreground hover:text-primary transition-colors py-2 ${
                      isActive(item.href) ? 'text-primary font-medium' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      onLoginClick();
                      setIsOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    登录
                  </Button>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      onRegisterClick();
                      setIsOpen(false);
                    }}
                  >
                    注册
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
