import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { MaterialCard } from "./MaterialCard";

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

interface MaterialSectionProps {
  title: string;
  materials: Material[];
  icon: React.ReactNode;
  defaultExpanded?: boolean;
  onMaterialClick: (material: Material) => void;
}

export function MaterialSection({ 
  title, 
  materials, 
  icon, 
  defaultExpanded = true,
  onMaterialClick 
}: MaterialSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (materials.length === 0) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="section-header hover:text-primary transition-colors w-full text-left"
      >
        {icon}
        <span>{title}</span>
        <span className="ml-2 text-muted-foreground">({materials.length})</span>
        <div className="ml-auto">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onMaterialClick={onMaterialClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}