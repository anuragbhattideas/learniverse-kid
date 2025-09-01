import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, BookOpen, Calculator, Trophy, User, Settings, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserData";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profile } = useUserProfile();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: BookOpen, label: "English", href: "/english" },
    { icon: Calculator, label: "Math", href: "/math" },
    { icon: Trophy, label: "Achievements", href: "/achievements" },
  ];

  const NavContent = () => (
    <div className="flex flex-col space-y-4 p-4">
      <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
        Learniverse
      </div>
      {navItems.map((item) => (
        <Link key={item.label} to={item.href}>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left hover:bg-primary/10 hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        </Link>
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
        
        {user && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Learniverse
            </h1>
          </Link>
          <div className="flex space-x-1">
            {navItems.slice(0, 3).map((item) => (
              <Link key={item.label} to={item.href}>
                <Button 
                  variant="ghost" 
                  className={`hover:bg-primary/10 hover:text-primary ${
                    location.pathname === item.href ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  {profile?.display_name || 'Student'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="rounded-full text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="hero"
              size="sm"
              onClick={() => navigate('/auth')}
              className="rounded-full"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <Link to="/">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Learniverse
          </h1>
        </Link>
        <div className="flex items-center space-x-2">
          {user ? (
            <div className="flex items-center space-x-2 px-2 py-1 bg-primary/10 rounded-full">
              <User className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-primary">
                {profile?.display_name || 'Student'}
              </span>
            </div>
          ) : (
            <Button
              variant="hero"
              size="sm"
              onClick={() => navigate('/auth')}
              className="text-xs px-3"
            >
              Sign In
            </Button>
          )}
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
        </div>
      </nav>
    </>
  );
};