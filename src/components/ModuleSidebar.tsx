import { useState } from "react";
import { Book, CheckCircle, Clock, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Module {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'locked' | 'available';
  progress: number;
  duration: string;
  materials: number;
}

interface ModuleSidebarProps {
  modules: Module[];
  currentModuleId: string;
  onModuleSelect: (moduleId: string) => void;
}

export function ModuleSidebar({ modules, currentModuleId, onModuleSelect }: ModuleSidebarProps) {
  const getStatusIcon = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'current':
        return <Clock className="h-4 w-4 text-primary" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Book className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Complete</Badge>;
      case 'current':
        return <Badge className="bg-primary">Current</Badge>;
      case 'locked':
        return <Badge variant="outline">Locked</Badge>;
      default:
        return null;
    }
  };

  return (
    <aside className="w-80 bg-card border-r border-border h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Course Modules</h2>
        
        <div className="space-y-3">
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={`module-item ${module.id === currentModuleId ? 'active' : ''} ${
                module.status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              onClick={() => module.status !== 'locked' && onModuleSelect(module.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground text-sm font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {getStatusIcon(module.status)}
                </div>
                {getStatusBadge(module.status)}
              </div>
              
              <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                {module.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{module.duration}</span>
                <span>{module.materials} materials</span>
              </div>
              
              {module.status !== 'locked' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}