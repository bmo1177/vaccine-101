import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Home,
  LogOut,
  Settings,
  Baby,
  Syringe,
  UserPlus,
  Calendar,
} from "lucide-react";

interface NavigationProps {
  role?: "admin" | "doctor" | "parent";
}

export const Navigation = ({ role }: NavigationProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, handle logout logic here
    navigate("/login");
  };

  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { label: "Dashboard", icon: <Home className="h-4 w-4" />, path: "/admin/dashboard" },
          { label: "Users", icon: <Users className="h-4 w-4" />, path: "/admin/users" },
          { label: "Articles", icon: <FileText className="h-4 w-4" />, path: "/articles" },
          { label: "Settings", icon: <Settings className="h-4 w-4" />, path: "/admin/settings" },
        ];
      case "doctor":
        return [
          { label: "Dashboard", icon: <Home className="h-4 w-4" />, path: "/doctor/dashboard" },
          { label: "Add Child", icon: <UserPlus className="h-4 w-4" />, path: "/doctor/add-child" },
          { label: "Articles", icon: <FileText className="h-4 w-4" />, path: "/articles" },
          { label: "Requests", icon: <Calendar className="h-4 w-4" />, path: "/doctor/requests/new" },
        ];
      case "parent":
        return [
          { label: "Dashboard", icon: <Home className="h-4 w-4" />, path: "/dashboard" },
          { label: "Children", icon: <Baby className="h-4 w-4" />, path: "/children" },
          { label: "Articles", icon: <FileText className="h-4 w-4" />, path: "/articles" },
          { label: "Vaccinations", icon: <Syringe className="h-4 w-4" />, path: "/vaccinations" },
        ];
      default:
        return [
          { label: "Home", icon: <Home className="h-4 w-4" />, path: "/" },
          { label: "Articles", icon: <FileText className="h-4 w-4" />, path: "/articles" },
        ];
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-bold text-primary">VaxTrack</span>
          <div className="hidden md:flex items-center gap-4">
            {getNavItems().map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {role && (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};