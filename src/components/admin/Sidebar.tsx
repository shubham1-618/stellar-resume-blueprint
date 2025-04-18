
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  BookOpen, 
  Users, 
  Settings, 
  LayoutDashboard, 
  FileText, 
  Image, 
  Video, 
  Layout, 
  PenTool, 
  Briefcase, 
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  activeSection?: string;
}

export const Sidebar = ({ onSectionChange, onLogout, activeSection = 'profile' }: SidebarProps) => {
  const { toast } = useToast();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'appearance', label: 'Appearance', icon: Layout },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNav = (section: string) => {
    onSectionChange(section);
    toast({
      title: `Navigating to ${section}`,
      description: `You are now viewing the ${section} section`,
    });
  };

  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r border-white/10 bg-gradient-to-b from-[#1A1F2C] to-[#0F172A]">
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">CMS Dashboard</h2>
        <p className="text-sm text-white/60">Manage your content easily</p>
      </div>
      
      <div className="px-6 py-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-white/60">admin@example.com</p>
          </div>
        </div>
      </div>
      
      <Separator className="bg-white/10 my-3" />
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Button 
            key={item.id}
            variant="ghost" 
            className={`w-full justify-start text-white hover:bg-white/10 ${
              activeSection === item.id ? 'bg-white/10 text-[#9b87f5]' : ''
            }`}
            size="sm"
            onClick={() => handleNav(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
      
      <div className="p-4 mt-auto">
        <Separator className="bg-white/10 mb-4" />
        <Button 
          variant="outline" 
          className="w-full border-white/10 text-white hover:bg-white/10" 
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};
