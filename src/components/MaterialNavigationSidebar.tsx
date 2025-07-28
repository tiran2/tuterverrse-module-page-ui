import { FileText, Play, Link, Video } from "lucide-react";

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

interface MaterialNavigationSidebarProps {
  materials: Material[];
  onMaterialClick: (materialId: string) => void;
}

export function MaterialNavigationSidebar({ materials, onMaterialClick }: MaterialNavigationSidebarProps) {
  const getIcon = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'video':
        return <Play className="h-4 w-4 text-purple-600" />;
      case 'link':
        return <Link className="h-4 w-4 text-green-600" />;
      case 'meeting':
        return <Video className="h-4 w-4 text-orange-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: Material['type']) => {
    switch (type) {
      case 'document':
        return 'Doc';
      case 'video':
        return 'Video';
      case 'link':
        return 'Link';
      case 'meeting':
        return 'Live';
      default:
        return 'Item';
    }
  };

  return (
    <aside className="w-72 bg-card border-r border-border h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Materials</h2>
        
        <div className="space-y-2">
          {materials.map((material) => (
            <div
              key={material.id}
              className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent border border-transparent hover:border-primary/20"
              onClick={() => onMaterialClick(material.id)}
            >
              <div className="flex-shrink-0">
                {getIcon(material.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {material.title}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">
                    {getTypeLabel(material.type)}
                  </span>
                  {material.duration && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {material.duration}
                      </span>
                    </>
                  )}
                  {material.size && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {material.size}
                      </span>
                    </>
                  )}
                </div>
              </div>
              {material.isNew && (
                <div className="w-2 h-2 bg-destructive rounded-full flex-shrink-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}