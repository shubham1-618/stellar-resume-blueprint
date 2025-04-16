
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, Globe, BookOpen, Video, ChevronDown, Eye, Calendar, Activity } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

export const Header = () => {
  const { siteData } = useSiteData();
  
  const getLastUpdatedDate = () => {
    if (siteData.blogPosts.length === 0) return "No posts yet";
    
    // Sort posts by date and get the most recent
    const dates = siteData.blogPosts.map(post => new Date(post.date)).sort((a, b) => b.getTime() - a.getTime());
    
    if (dates.length > 0) {
      const mostRecent = dates[0];
      return mostRecent.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
    
    return "No posts yet";
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">WordPress-like CMS</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="border-white/10 text-white hover:bg-white/10">
            <Bell className="h-4 w-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 gap-2">
                Actions <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1A1F2C] text-white border border-white/10">
              <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                <Eye className="mr-2 h-4 w-4" /> View Site
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" /> Schedule Post
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                <Activity className="mr-2 h-4 w-4" /> View Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
          <CardContent className="pt-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-white/90">Total Views</p>
              <Globe className="h-4 w-4 text-white/60" />
            </div>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-white/60">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
          <CardContent className="pt-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-white/90">Blog Posts</p>
              <BookOpen className="h-4 w-4 text-white/60" />
            </div>
            <div className="text-2xl font-bold">{siteData.blogPosts.length}</div>
            <p className="text-xs text-white/60">Last updated: {getLastUpdatedDate()}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
          <CardContent className="pt-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-white/90">Videos</p>
              <Video className="h-4 w-4 text-white/60" />
            </div>
            <div className="text-2xl font-bold">{siteData.videos.length}</div>
            <p className="text-xs text-white/60">Total duration: 45 min</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
          <CardContent className="pt-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-white/90">Projects</p>
              <Activity className="h-4 w-4 text-white/60" />
            </div>
            <div className="text-2xl font-bold">{siteData.projects.length}</div>
            <p className="text-xs text-white/60">{siteData.projects.filter(p => p.githubUrl).length} with GitHub links</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
