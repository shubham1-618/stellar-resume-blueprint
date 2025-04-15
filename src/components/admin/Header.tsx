
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, BookOpen, Video } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

export const Header = () => {
  const { siteData } = useSiteData();
  
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <p className="text-xs text-white/60">Last post 3 days ago</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
          <CardContent className="pt-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-white/90">Videos</p>
              <Video className="h-4 w-4 text-white/60" />
            </div>
            <div className="text-2xl font-bold">{siteData.videos.length}</div>
            <p className="text-xs text-white/60">Last video added 1 week ago</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
