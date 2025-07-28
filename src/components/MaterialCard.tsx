import { FileText, Play, Link, Video, Calendar, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface MaterialCardProps {
  material: Material;
  onMaterialClick: (material: Material) => void;
}

export function MaterialCard({ material, onMaterialClick }: MaterialCardProps) {
  const getIcon = () => {
    switch (material.type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <Play className="h-5 w-5 text-purple-600" />;
      case 'link':
        return <Link className="h-5 w-5 text-green-600" />;
      case 'meeting':
        return <Video className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCardClassName = () => {
    const baseClass = "material-card hover-lift";
    switch (material.type) {
      case 'document':
        return `${baseClass} material-card-document`;
      case 'video':
        return `${baseClass} material-card-video`;
      case 'link':
        return `${baseClass} material-card-link`;
      case 'meeting':
        return `${baseClass} material-card-meeting`;
      default:
        return baseClass;
    }
  };

  const getTypeLabel = () => {
    switch (material.type) {
      case 'document':
        return 'Document';
      case 'video':
        return 'Video';
      case 'link':
        return 'Resource';
      case 'meeting':
        return 'Live Meeting';
      default:
        return 'Material';
    }
  };

  return (
    <div className={getCardClassName()} onClick={() => onMaterialClick(material)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-muted">
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-foreground">{material.title}</h4>
              {material.isNew && (
                <Badge variant="destructive" className="text-xs">New</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{getTypeLabel()}</p>
          </div>
        </div>
        
        {material.type === 'meeting' && material.meetingTime && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{material.meetingTime}</span>
          </div>
        )}
      </div>

      {material.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {material.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          {material.duration && (
            <span>{material.duration}</span>
          )}
          {material.size && (
            <span>{material.size}</span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {material.type === 'document' && (
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          )}
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ExternalLink className="h-3 w-3 mr-1" />
            {material.type === 'meeting' ? 'Join' : 'Open'}
          </Button>
        </div>
      </div>
    </div>
  );
}