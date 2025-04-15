
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, BookOpen, Users, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

export const Sidebar = ({ onSectionChange, onLogout }: SidebarProps) => {
  return (
    <div className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r border-white/10 bg-gradient-to-b from-[#1A1F2C] to-[#0F172A]">
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Dashboard</h2>
        <p className="text-sm text-white/60">Manage your website content</p>
      </div>
      <Separator className="bg-white/10" />
      <nav className="flex-1 p-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:bg-white/10" 
          size="sm"
          onClick={() => onSectionChange('profile')}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:bg-white/10" 
          size="sm"
          onClick={() => onSectionChange('blog')}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Blog
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:bg-white/10" 
          size="sm"
          onClick={() => onSectionChange('users')}
        >
          <Users className="mr-2 h-4 w-4" />
          User Accounts
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-white hover:bg-white/10" 
          size="sm"
          onClick={() => onSectionChange('settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
      <div className="p-4 mt-auto">
        <Button 
          variant="outline" 
          className="w-full border-white/10 text-white hover:bg-white/10" 
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
