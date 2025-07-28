import { FileText, Play, Link, Video } from "lucide-react";
import { MaterialSection } from "./MaterialSection";
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
  const documents = moduleData.materials.filter(m => m.type === 'document');
  const videos = moduleData.materials.filter(m => m.type === 'video');
  const links = moduleData.materials.filter(m => m.type === 'link');
  const meetings = moduleData.materials.filter(m => m.type === 'meeting');

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

      {/* Materials Sections */}
      <div className="space-y-6">
        <MaterialSection
          title="Documents & Reading Materials"
          materials={documents}
          icon={<FileText className="h-5 w-5 text-blue-600" />}
          onMaterialClick={onMaterialClick}
        />

        <MaterialSection
          title="Video Lectures"
          materials={videos}
          icon={<Play className="h-5 w-5 text-purple-600" />}
          onMaterialClick={onMaterialClick}
        />

        <MaterialSection
          title="Additional Resources"
          materials={links}
          icon={<Link className="h-5 w-5 text-green-600" />}
          onMaterialClick={onMaterialClick}
        />

        <MaterialSection
          title="Live Sessions"
          materials={meetings}
          icon={<Video className="h-5 w-5 text-orange-600" />}
          onMaterialClick={onMaterialClick}
        />
      </div>
    </main>
  );
}