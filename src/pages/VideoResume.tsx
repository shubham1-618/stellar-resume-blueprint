
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";

const VideoResume = () => {
  // Mock data for videos - in a real app this would come from API/database
  const [videos] = useState([
    {
      id: "1",
      title: "My DevOps Journey",
      description: "An overview of my career path and experiences in DevOps",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video
      platform: "youtube"
    },
    {
      id: "2",
      title: "Cloud Infrastructure Skills",
      description: "Demonstrating my expertise in cloud architecture and deployment",
      embedUrl: "https://player.vimeo.com/video/76979871", // Replace with your actual video
      platform: "vimeo"
    },
    {
      id: "3",
      title: "Kubernetes & Container Orchestration",
      description: "Showcasing my skills in container technologies",
      embedUrl: "https://www.youtube.com/embed/PH-2FfFD2PU", // Replace with your actual video
      platform: "youtube"
    }
  ]);

  const [currentVideo, setCurrentVideo] = useState(videos[0]);

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
                  {videos.map(video => (
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
                  {videos.filter(v => v.platform === "youtube").map(video => (
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
                  {videos.filter(v => v.platform === "vimeo").map(video => (
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
      </div>
    </div>
  );
};

export default VideoResume;
