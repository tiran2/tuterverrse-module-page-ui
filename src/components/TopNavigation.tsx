import { User, Bell, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopNavigationProps {
  currentModule: string;
  courseName: string;
}

export function TopNavigation({ currentModule, courseName }: TopNavigationProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="text-primary hover:text-primary-light cursor-pointer">
            {courseName}
          </span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{currentModule}</span>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                JS
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">John Student</p>
              <p className="text-muted-foreground">Student</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}