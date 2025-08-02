import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNavigation } from "@/components/TopNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Video, Link, Upload } from "lucide-react";

interface MaterialFormData {
  title: string;
  type: 'document' | 'video' | 'link';
  description: string;
  url: string;
  file?: File;
  duration?: string;
  meetingTime?: string;
}

export default function UploadMaterials() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<MaterialFormData>({
    title: '',
    type: 'document',
    description: '',
    url: '',
    duration: ''
  });

  const handleInputChange = (field: keyof MaterialFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === 'document' && !formData.file) {
      toast({
        title: "Error", 
        description: "Please upload a file for document materials",
        variant: "destructive"
      });
      return;
    }

    if (formData.type === 'link' && !formData.url) {
      toast({
        title: "Error",
        description: "Please provide a URL for link materials", 
        variant: "destructive"
      });
      return;
    }

    // Create new material object
    const newMaterial = {
      id: `${formData.type}-${Date.now()}`,
      title: formData.title,
      type: formData.type,
      description: formData.description,
      url: formData.type === 'link' ? formData.url : (formData.file ? URL.createObjectURL(formData.file) : '#'),
      duration: formData.duration || undefined,
      size: formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` : undefined,
      isNew: true
    };

    // Store in localStorage for demo purposes
    const existingMaterials = JSON.parse(localStorage.getItem('uploadedMaterials') || '[]');
    existingMaterials.push(newMaterial);
    localStorage.setItem('uploadedMaterials', JSON.stringify(existingMaterials));

    toast({
      title: "Success",
      description: "Material uploaded successfully!",
    });

    // Navigate back to module page
    navigate('/module');
  };

  const getTypeIcon = () => {
    switch (formData.type) {
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'link':
        return <Link className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentModule="Upload Materials"
        courseName="Computer Science Fundamentals"
      />
      
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Upload Learning Materials</h1>
          <p className="text-muted-foreground">Add new materials to your course module</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Material Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="type">Material Type *</Label>
              <Select value={formData.type} onValueChange={(value: 'document' | 'video' | 'link') => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Document
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video
                    </div>
                  </SelectItem>
                  <SelectItem value="link">
                    <div className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Resource Link
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter material title"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter material description"
                rows={3}
                required
              />
            </div>

            {/* Conditional Fields Based on Type */}
            {formData.type === 'document' && (
              <div className="space-y-2">
                <Label htmlFor="file">Upload File *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    className="hidden"
                  />
                  <Label htmlFor="file" className="cursor-pointer">
                    <div className="text-sm text-muted-foreground">
                      {formData.file ? formData.file.name : "Click to upload document"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Supports PDF, DOC, DOCX, PPT, PPTX, TXT
                    </div>
                  </Label>
                </div>
              </div>
            )}

            {formData.type === 'link' && (
              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange('url', e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>
            )}

            {(formData.type === 'video') && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="url">Video URL</Label>
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange('url', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 15 min"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                <div className="flex items-center gap-2">
                  {getTypeIcon()}
                  Upload Material
                </div>
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/module')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}