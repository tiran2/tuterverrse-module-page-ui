import { Button } from "@/components/ui/button";
import { BookOpen, Users, Calendar, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-lighter via-accent-purple-lighter to-primary-lighter">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Professional Online Tutoring Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience our modern, clean, and student-friendly module page design. 
              Built for seamless learning with organized materials, progress tracking, and live sessions.
            </p>
            <Button 
              onClick={() => navigate('/module')}
              size="lg" 
              className="bg-primary hover:bg-primary-light text-white px-8 py-3"
            >
              View Module Page Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border border-border hover-lift">
              <div className="w-12 h-12 bg-primary-lighter rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Organized Materials</h3>
              <p className="text-muted-foreground text-sm">
                Documents, videos, and resources organized by type with easy navigation
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border hover-lift">
              <div className="w-12 h-12 bg-accent-purple-lighter rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-accent-purple" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Live Sessions</h3>
              <p className="text-muted-foreground text-sm">
                Join live meetings and study groups with integrated video links
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border hover-lift">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Visual progress indicators and module completion status
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border hover-lift">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Clean Design</h3>
              <p className="text-muted-foreground text-sm">
                Professional, minimal interface with soft shadows and rounded corners
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
