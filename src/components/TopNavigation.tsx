import { User, Bell, Settings, ChevronRight, LogOut, UserCog, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface TopNavigationProps {
  currentModule: string;
  courseName: string;
}

export function TopNavigation({ currentModule, courseName }: TopNavigationProps) {
  const { toast } = useToast();

  const mockNotifications = [
    { id: 1, title: "New assignment posted", message: "Data Structures Assignment 3 is now available", time: "2 minutes ago", unread: true },
    { id: 2, title: "Upcoming lecture", message: "Advanced Algorithms lecture starts in 30 minutes", time: "25 minutes ago", unread: true },
    { id: 3, title: "Grade updated", message: "Your quiz score has been updated", time: "1 hour ago", unread: false },
  ];

  const handleNotificationClick = (notification: any) => {
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const handleSettingsAction = (action: string) => {
    toast({
      title: "Settings",
      description: `${action} clicked`,
    });
  };

  const handleProfileAction = (action: string) => {
    toast({
      title: "Profile",
      description: `${action} clicked`,
    });
  };

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
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h4 className="font-semibold">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have {mockNotifications.filter(n => n.unread).length} unread notifications</p>
              </div>
              <div className="max-h-80 overflow-auto">
                {mockNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b hover:bg-accent cursor-pointer ${notification.unread ? 'bg-accent/50' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`h-2 w-2 rounded-full mt-2 ${notification.unread ? 'bg-primary' : 'bg-transparent'}`} />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="ghost" className="w-full text-sm">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSettingsAction("Account Settings")}>
                <UserCog className="mr-2 h-4 w-4" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSettingsAction("Theme: Light")}>
                <Sun className="mr-2 h-4 w-4" />
                Theme: Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSettingsAction("Theme: Dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Theme: Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSettingsAction("Theme: System")}>
                <Monitor className="mr-2 h-4 w-4" />
                Theme: System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3 cursor-pointer hover:bg-accent rounded-lg p-2 transition-colors">
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
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction("Profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileAction("Dashboard")}>
                <UserCog className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction("Sign Out")} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}