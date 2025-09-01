import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, BookOpen, Calculator, Trophy, User, Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: BookOpen, label: "English", href: "/english" },
    { icon: Calculator, label: "Math", href: "/math" },
    { icon: Trophy, label: "Achievements", href: "/achievements" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const NavContent = () => (
    <div className="flex flex-col space-y-4 p-4">
      <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
        Learniverse
      </div>
      {navItems.map((item) => (
        <Button 
          key={item.label}
          variant="ghost" 
          className="justify-start text-left hover:bg-primary/10 hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </Button>
      ))}
      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start"
        >
          {theme === "dark" ? <Sun className="mr-3 h-4 w-4" /> : <Moon className="mr-3 h-4 w-4" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Learniverse
          </h1>
          <div className="flex space-x-1">
            {navItems.slice(0, 4).map((item) => (
              <Button 
                key={item.label}
                variant="ghost" 
                className="hover:bg-primary/10 hover:text-primary"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Learniverse
        </h1>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <NavContent />
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
};