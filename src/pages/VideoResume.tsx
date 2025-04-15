
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import { useSiteData } from "@/context/SiteDataContext";

const VideoResume = () => {
  const { siteData } = useSiteData();
  const [currentVideo, setCurrentVideo] = useState(siteData.videos[0]);

  // Update currentVideo when videos change
  useEffect(() => {
    if (siteData.videos.length > 0) {
      setCurrentVideo(siteData.videos[0]);
    }
  }, [siteData.videos]);

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Video Resume</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch my introduction and learn about my skills, experience, and approach to DevOps engineering.
          </p>
        </div>
        
        {siteData.videos.length > 0 && currentVideo ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe 
                      src={currentVideo.embedUrl}
                      title={currentVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <h2 className="text-2xl font-bold">{currentVideo.title}</h2>
                <p className="text-muted-foreground mt-2">{currentVideo.description}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Video Playlist</h3>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="youtube" className="flex-1">YouTube</TabsTrigger>
                  <TabsTrigger value="vimeo" className="flex-1">Vimeo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <div className="space-y-4">
                    {siteData.videos.map(video => (
                      <Card 
                        key={video.id}
                        className={`cursor-pointer hover:bg-accent/40 transition-colors ${currentVideo.id === video.id ? 'border-primary' : ''}`}
                        onClick={() => setCurrentVideo(video)}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {video.description}
                          </p>
                          <div className="text-xs text-muted-foreground mt-2 capitalize">
                            {video.platform}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="youtube" className="mt-4">
                  <div className="space-y-4">
                    {siteData.videos.filter(v => v.platform === "youtube").map(video => (
                      <Card 
                        key={video.id}
                        className={`cursor-pointer hover:bg-accent/40 transition-colors ${currentVideo.id === video.id ? 'border-primary' : ''}`}
                        onClick={() => setCurrentVideo(video)}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {video.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="vimeo" className="mt-4">
                  <div className="space-y-4">
                    {siteData.videos.filter(v => v.platform === "vimeo").map(video => (
                      <Card 
                        key={video.id}
                        className={`cursor-pointer hover:bg-accent/40 transition-colors ${currentVideo.id === video.id ? 'border-primary' : ''}`}
                        onClick={() => setCurrentVideo(video)}
                      >
                        <CardContent className="p-4">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {video.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No videos available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoResume;
