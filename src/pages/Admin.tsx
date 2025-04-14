
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, FileText, Image, Settings, User, BookOpen, Globe, Video } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Blog management states
  const [blogs, setBlogs] = useState([
    { id: 1, title: "Getting Started with DevOps", status: "Published" },
    { id: 2, title: "Kubernetes for Beginners", status: "Published" },
    { id: 3, title: "CI/CD Pipeline Automation", status: "Published" },
    { id: 4, title: "Docker Container Orchestration", status: "Draft" },
  ]);
  
  // Video resume management states
  const [videos, setVideos] = useState([
    { id: 1, title: "My DevOps Journey", platform: "YouTube", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, title: "Cloud Infrastructure Skills", platform: "Vimeo", embedUrl: "https://player.vimeo.com/video/76979871" },
    { id: 3, title: "Kubernetes & Container Orchestration", platform: "YouTube", embedUrl: "https://www.youtube.com/embed/PH-2FfFD2PU" },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a placeholder for actual authentication logic
    // In a real app, you would validate credentials against a backend
    if (email === "admin@example.com" && password === "password") {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  // Blog management functions
  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    toast({
      title: "Blog deleted",
      description: "The blog post has been deleted successfully",
    });
  };

  const handleBlogStatusChange = (id: number, status: string) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, status } : blog
    ));
    toast({
      title: "Status updated",
      description: `Blog status has been changed to ${status}`,
    });
  };

  // Video management functions
  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter(video => video.id !== id));
    toast({
      title: "Video deleted",
      description: "The video has been deleted successfully",
    });
  };

  const handleAddVideo = () => {
    const newId = Math.max(...videos.map(v => v.id), 0) + 1;
    setVideos([...videos, { 
      id: newId, 
      title: "New Video", 
      platform: "YouTube", 
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
    }]);
    toast({
      title: "Video added",
      description: "A new video has been added. Please update its details.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/40">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <CardDescription>Login to manage your personal website content</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r bg-card">
          <div className="px-6 py-6">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage your website content</p>
          </div>
          <Separator />
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Globe className="mr-2 h-4 w-4" />
              Portfolio
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Blog
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Video className="mr-2 h-4 w-4" />
              Video Resume
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Image className="mr-2 h-4 w-4" />
              Media
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
          <div className="p-4 mt-auto">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                setIsAuthenticated(false);
                toast({
                  title: "Logged out",
                  description: "You have been successfully logged out",
                });
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-64 p-6">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{blogs.length}</div>
                <p className="text-xs text-muted-foreground">Last post 3 days ago</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Videos</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{videos.length}</div>
                <p className="text-xs text-muted-foreground">Last video added 1 week ago</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="videos">Video Resume</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="Shubham Sahare" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="DevOps Engineer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="shubham.sahare@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="Mumbai, India" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      className="min-h-32"
                      defaultValue="Hello! I'm Shubham, a passionate DevOps engineer with expertise in cloud infrastructure, CI/CD pipelines, and container orchestration. I specialize in building robust, scalable, and automated deployment systems."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => toast({
                      title: "Profile updated",
                      description: "Your profile has been updated successfully",
                    })}
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Add or remove your technical skills.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Kubernetes", "Docker", "AWS", "CI/CD", "Terraform", "Ansible", "Jenkins", "Git", "Linux", "Monitoring"].map((skill) => (
                      <div key={skill} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {skill}
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0">×</Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Input placeholder="Add new skill..." />
                    <Button>Add</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blog" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>
                      Manage your blog posts and articles.
                    </CardDescription>
                  </div>
                  <Button>
                    Add New Post
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-3 text-left font-medium">Title</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {blogs.map((blog) => (
                            <tr key={blog.id} className="border-b">
                              <td className="px-4 py-3">{blog.title}</td>
                              <td className="px-4 py-3">
                                <Select defaultValue={blog.status} onValueChange={(value) => handleBlogStatusChange(blog.id, value)}>
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Published">Published</SelectItem>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Edit
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteBlog(blog.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Blog Editor</CardTitle>
                  <CardDescription>
                    Create or edit blog posts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Post Title</Label>
                    <Input id="post-title" placeholder="Enter post title" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-category">Category</Label>
                      <Select>
                        <SelectTrigger id="post-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="devops">DevOps</SelectItem>
                          <SelectItem value="kubernetes">Kubernetes</SelectItem>
                          <SelectItem value="cloud">Cloud Computing</SelectItem>
                          <SelectItem value="automation">Automation</SelectItem>
                          <SelectItem value="docker">Docker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-date">Publish Date</Label>
                      <Input id="post-date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Post Content</Label>
                    <Textarea 
                      id="post-content" 
                      className="min-h-80"
                      placeholder="Write your blog post content here..."
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Publish Post</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Video Resume</CardTitle>
                    <CardDescription>
                      Manage your video resume content.
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddVideo}>
                    Add New Video
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-3 text-left font-medium">Title</th>
                            <th className="px-4 py-3 text-left font-medium">Platform</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {videos.map((video) => (
                            <tr key={video.id} className="border-b">
                              <td className="px-4 py-3">{video.title}</td>
                              <td className="px-4 py-3">{video.platform}</td>
                              <td className="px-4 py-3 text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Edit
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteVideo(video.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Video Editor</CardTitle>
                  <CardDescription>
                    Add or edit video information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input id="video-title" placeholder="Enter video title" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-platform">Platform</Label>
                      <Select>
                        <SelectTrigger id="video-platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="vimeo">Vimeo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-url">Embed URL</Label>
                      <Input id="video-url" placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea 
                      id="video-description" 
                      className="min-h-20"
                      placeholder="Describe what this video is about..."
                    />
                  </div>
                  <div className="pt-4">
                    <Label>Video Preview</Label>
                    <div className="mt-2 border rounded-md p-4 flex items-center justify-center bg-muted/50 aspect-video">
                      <div className="text-muted-foreground">
                        Preview will appear here once you save the video
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Video</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Website Settings</CardTitle>
                  <CardDescription>
                    Manage general settings for your website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input id="siteTitle" defaultValue="Shubham Sahare - DevOps Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input 
                      id="siteDescription" 
                      defaultValue="Personal portfolio and resume website for Shubham Sahare" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">SEO Keywords</Label>
                    <Input 
                      id="keywords" 
                      defaultValue="devops, cloud, kubernetes, docker, CI/CD, automation, infrastructure, engineer" 
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <input type="checkbox" id="darkMode" className="mr-1" />
                    <Label htmlFor="darkMode">Enable Dark Mode by Default</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => toast({
                      title: "Settings saved",
                      description: "Your website settings have been updated",
                    })}
                  >
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Update your password and security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Change Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Admin;
