import { TopNavigation } from "@/components/TopNavigation";
import { MaterialNavigationSidebar } from "@/components/MaterialNavigationSidebar";
import { ModuleContent } from "@/components/ModuleContent";

const mockModuleData = {
  id: "3",
  title: "Control Structures: Loops and Conditionals",
  description: "Master the fundamental building blocks of programming logic. Learn how to control program flow using conditional statements and various types of loops. This module covers if-else statements, switch cases, for loops, while loops, and practical applications in real-world scenarios.",
  duration: "4h 0m",
  progress: 75,
  materials: [
    {
      id: "doc1",
      title: "Control Structures Overview",
      type: "document" as const,
      description: "Comprehensive guide to understanding control structures in programming",
      size: "2.5 MB",
      url: "#"
    },
    {
      id: "doc2", 
      title: "Loop Patterns and Best Practices",
      type: "document" as const,
      description: "Learn efficient looping techniques and common patterns",
      size: "1.8 MB",
      url: "#",
      isNew: true
    },
    {
      id: "vid1",
      title: "Introduction to If-Else Statements",
      type: "video" as const,
      description: "Visual walkthrough of conditional logic implementation",
      duration: "15 min",
      url: "#"
    },
    {
      id: "vid2",
      title: "Mastering For and While Loops",
      type: "video" as const,
      description: "Detailed explanation of different loop types with examples",
      duration: "28 min",
      url: "#"
    },
    {
      id: "vid3",
      title: "Nested Loops and Complex Conditions",
      type: "video" as const,
      description: "Advanced techniques for handling complex programming logic",
      duration: "35 min",
      url: "#"
    },
    {
      id: "link1",
      title: "Interactive Coding Playground",
      type: "link" as const,
      description: "Practice control structures with hands-on exercises",
      url: "#"
    },
    {
      id: "link2",
      title: "Loop Performance Analysis Tool",
      type: "link" as const,
      description: "Analyze and optimize your loop implementations",
      url: "#"
    },
    {
      id: "meeting1",
      title: "Weekly Q&A Session",
      type: "meeting" as const,
      description: "Join our instructor for live questions and code review",
      meetingTime: "Today 3:00 PM",
      url: "#"
    },
    {
      id: "meeting2",
      title: "Study Group: Loop Challenges",
      type: "meeting" as const,
      description: "Collaborative problem-solving session with peers",
      meetingTime: "Tomorrow 7:00 PM",
      url: "#"
    }
  ]
};

export default function ModulePage() {
  const handleMaterialClick = (material: any) => {
    console.log("Opening material:", material);
    // Handle material opening logic here
  };

  const handleMaterialNavigate = (materialId: string) => {
    const element = document.getElementById(`material-${materialId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      // Add a highlight effect
      element.style.transition = 'box-shadow 0.3s ease';
      element.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)';
      setTimeout(() => {
        element.style.boxShadow = '';
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation 
        currentModule="Control Structures: Loops and Conditionals"
        courseName="Computer Science Fundamentals"
      />
      
      <div className="flex">
        <MaterialNavigationSidebar
          materials={mockModuleData.materials}
          onMaterialClick={handleMaterialNavigate}
        />
        
        <ModuleContent
          moduleData={mockModuleData}
          onMaterialClick={handleMaterialClick}
        />
      </div>
    </div>
  );
}