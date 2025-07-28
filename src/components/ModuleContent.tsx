import { MaterialCard } from "./MaterialCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Material {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'meeting';
  description?: string;
  duration?: string;
  size?: string;
  url: string;
  isNew?: boolean;
  meetingTime?: string;
}

interface ModuleData {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  materials: Material[];
}

interface ModuleContentProps {
  moduleData: ModuleData;
  onMaterialClick: (material: Material) => void;
}

export function ModuleContent({ moduleData, onMaterialClick }: ModuleContentProps) {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-foreground">{moduleData.title}</h1>
          <Badge className="bg-primary text-primary-foreground">
            {moduleData.duration}
          </Badge>
        </div>
        
        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
          {moduleData.description}
        </p>

        {/* Progress Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Your Progress</h3>
            <span className="text-sm font-medium text-primary">{moduleData.progress}% Complete</span>
          </div>
          <Progress value={moduleData.progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Keep going! You're making great progress through this module.
          </p>
        </div>
      </div>

      {/* All Materials in Continuous Layout */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Learning Materials</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {moduleData.materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onMaterialClick={onMaterialClick}
            />
          ))}
        </div>
      </div>
    </main>
  );
}