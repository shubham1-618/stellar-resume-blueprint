
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, FileText, Image, Settings, User, BookOpen, Globe, Video, Users, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSiteData, type BlogPost, type VideoItem } from "@/context/SiteDataContext";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { siteData, updatePersonalInfo, updateBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, 
          updateVideos, addVideo, updateVideo, deleteVideo, updateSiteSettings } = useSiteData();

  // User management states
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin" },
    { id: 2, name: "Content Manager", email: "manager@example.com", role: "Editor" },
  ]);

  // New user form states
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("Editor");

  // Blog form states
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogExcerpt, setNewBlogExcerpt] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("DevOps");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogDate, setNewBlogDate] = useState("");
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

  // Video form states
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDescription, setNewVideoDescription] = useState("");
  const [newVideoPlatform, setNewVideoPlatform] = useState<"youtube" | "vimeo">("youtube");
  const [newVideoEmbedUrl, setNewVideoEmbedUrl] = useState("");
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null);

  // Settings form states
  const [whatsappLink, setWhatsappLink] = useState(siteData.siteSettings.whatsappLink);
  const [showWhatsappSection, setShowWhatsappSection] = useState(siteData.siteSettings.showWhatsappSection);
  const [heroVideoUrl, setHeroVideoUrl] = useState(siteData.siteSettings.heroVideoUrl);
  const [siteTitle, setSiteTitle] = useState(siteData.siteSettings.siteTitle);
  const [siteDescription, setSiteDescription] = useState(siteData.siteSettings.siteDescription);
  const [seoKeywords, setSeoKeywords] = useState(siteData.siteSettings.seoKeywords);

  // Personal info form states
  const [name, setName] = useState(siteData.personalInfo.name);
  const [jobTitle, setJobTitle] = useState(siteData.personalInfo.jobTitle);
  const [bio, setBio] = useState(siteData.personalInfo.bio);
  const [location, setLocation] = useState(siteData.personalInfo.location);
  const [personalEmail, setPersonalEmail] = useState(siteData.personalInfo.email);
  const [profileImageUrl, setProfileImageUrl] = useState(siteData.personalInfo.profileImageUrl);
  const [resumeUrl, setResumeUrl] = useState(siteData.personalInfo.resumeUrl);
  const [skills, setSkills] = useState<string[]>(siteData.personalInfo.skills);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    // Update states when siteData changes
    setWhatsappLink(siteData.siteSettings.whatsappLink);
    setShowWhatsappSection(siteData.siteSettings.showWhatsappSection);
    setHeroVideoUrl(siteData.siteSettings.heroVideoUrl);
    setSiteTitle(siteData.siteSettings.siteTitle);
    setSiteDescription(siteData.siteSettings.siteDescription);
    setSeoKeywords(siteData.siteSettings.seoKeywords);
    
    setName(siteData.personalInfo.name);
    setJobTitle(siteData.personalInfo.jobTitle);
    setBio(siteData.personalInfo.bio);
    setLocation(siteData.personalInfo.location);
    setPersonalEmail(siteData.personalInfo.email);
    setProfileImageUrl(siteData.personalInfo.profileImageUrl);
    setResumeUrl(siteData.personalInfo.resumeUrl);
    setSkills(siteData.personalInfo.skills);
  }, [siteData]);

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
    deleteBlogPost(id);
  };

  const handleBlogStatusChange = (id: number, status: "Published" | "Draft") => {
    updateBlogPost(id, { status });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setNewBlogTitle(blog.title);
    setNewBlogExcerpt(blog.excerpt);
    setNewBlogCategory(blog.category);
    setNewBlogContent(blog.content);
    setNewBlogDate(blog.date);
  };

  const handleSaveBlog = () => {
    if (!newBlogTitle || !newBlogExcerpt || !newBlogCategory || !newBlogContent) {
      toast({
        title: "Error",
        description: "Please fill in all required blog fields",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    if (editingBlogId) {
      // Update existing blog
      updateBlogPost(editingBlogId, {
        title: newBlogTitle,
        excerpt: newBlogExcerpt,
        category: newBlogCategory,
        content: newBlogContent,
        date: newBlogDate || today
      });
    } else {
      // Add new blog
      addBlogPost({
        title: newBlogTitle,
        excerpt: newBlogExcerpt,
        category: newBlogCategory,
        content: newBlogContent,
        date: newBlogDate || today,
        status: "Draft"
      });
    }
    
    // Clear form
    resetBlogForm();
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setNewBlogTitle("");
    setNewBlogExcerpt("");
    setNewBlogCategory("DevOps");
    setNewBlogContent("");
    setNewBlogDate("");
  };

  // Video management functions
  const handleDeleteVideo = (id: number) => {
    deleteVideo(id);
  };

  const handleEditVideo = (video: VideoItem) => {
    setEditingVideoId(video.id);
    setNewVideoTitle(video.title);
    setNewVideoDescription(video.description);
    setNewVideoPlatform(video.platform);
    setNewVideoEmbedUrl(video.embedUrl);
  };

  const handleSaveVideo = () => {
    if (!newVideoTitle || !newVideoDescription || !newVideoEmbedUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required video fields",
        variant: "destructive",
      });
      return;
    }
    
    if (editingVideoId) {
      // Update existing video
      updateVideo(editingVideoId, {
        title: newVideoTitle,
        description: newVideoDescription,
        platform: newVideoPlatform,
        embedUrl: newVideoEmbedUrl
      });
    } else {
      // Add new video
      addVideo({
        title: newVideoTitle,
        description: newVideoDescription,
        platform: newVideoPlatform,
        embedUrl: newVideoEmbedUrl
      });
    }
    
    // Clear form
    resetVideoForm();
  };

  const resetVideoForm = () => {
    setEditingVideoId(null);
    setNewVideoTitle("");
    setNewVideoDescription("");
    setNewVideoPlatform("youtube");
    setNewVideoEmbedUrl("");
  };

  // User management functions
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUserName || !newUserEmail || !newUserPassword) {
      toast({
        title: "Error",
        description: "Please fill in all user fields",
        variant: "destructive",
      });
      return;
    }
    
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([...users, {
      id: newId,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole
    }]);
    
    // Reset form
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserRole("Editor");
    
    toast({
      title: "User created",
      description: `New user ${newUserName} has been created successfully.`,
    });
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully",
    });
  };

  // Settings management functions
  const handleSaveSettings = () => {
    updateSiteSettings({
      whatsappLink,
      showWhatsappSection,
      heroVideoUrl,
      siteTitle,
      siteDescription,
      seoKeywords
    });
    
    toast({
      title: "Settings saved",
      description: "Your site settings have been updated",
    });
  };

  // Personal info management functions
  const handleSavePersonalInfo = () => {
    updatePersonalInfo({
      name,
      jobTitle,
      bio,
      location,
      email: personalEmail,
      profileImageUrl,
      resumeUrl,
      skills
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
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
              <Users className="mr-2 h-4 w-4" />
              User Accounts
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
                <div className="text-2xl font-bold">{siteData.blogPosts.length}</div>
                <p className="text-xs text-muted-foreground">Last post 3 days ago</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Videos</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{siteData.videos.length}</div>
                <p className="text-xs text-muted-foreground">Last video added 1 week ago</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="videos">Video Resume</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
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
                      <Input 
                        id="fullName" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input 
                        id="jobTitle" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profileImage">Profile Image URL</Label>
                      <Input 
                        id="profileImage" 
                        value={profileImageUrl}
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resumeUrl">Resume URL (PDF)</Label>
                      <Input 
                        id="resumeUrl" 
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        placeholder="https://example.com/resume.pdf"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      className="min-h-32"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSavePersonalInfo}>
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
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {skill}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 p-0"
                          onClick={() => handleRemoveSkill(skill)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Input 
                      placeholder="Add new skill..." 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button onClick={handleAddSkill}>Add</Button>
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
                  <Button onClick={resetBlogForm}>
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
                          {siteData.blogPosts.map((blog) => (
                            <tr key={blog.id} className="border-b">
                              <td className="px-4 py-3">{blog.title}</td>
                              <td className="px-4 py-3">
                                <Select 
                                  defaultValue={blog.status} 
                                  onValueChange={(value: "Published" | "Draft") => handleBlogStatusChange(blog.id, value)}
                                >
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
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mr-2"
                                  onClick={() => handleEditBlog(blog)}
                                >
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
                  <CardTitle>{editingBlogId ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
                  <CardDescription>
                    {editingBlogId ? "Update your blog post content." : "Create a new blog post."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Post Title</Label>
                    <Input 
                      id="post-title" 
                      placeholder="Enter post title" 
                      value={newBlogTitle}
                      onChange={(e) => setNewBlogTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-category">Category</Label>
                      <Select 
                        value={newBlogCategory}
                        onValueChange={setNewBlogCategory}
                      >
                        <SelectTrigger id="post-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Kubernetes">Kubernetes</SelectItem>
                          <SelectItem value="Cloud">Cloud Computing</SelectItem>
                          <SelectItem value="Automation">Automation</SelectItem>
                          <SelectItem value="Docker">Docker</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-date">Publish Date</Label>
                      <Input 
                        id="post-date" 
                        type="date" 
                        value={newBlogDate}
                        onChange={(e) => setNewBlogDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-excerpt">Post Excerpt</Label>
                    <Textarea 
                      id="post-excerpt" 
                      className="min-h-20"
                      placeholder="A short summary of your post (shown in previews)"
                      value={newBlogExcerpt}
                      onChange={(e) => setNewBlogExcerpt(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Post Content</Label>
                    <Textarea 
                      id="post-content" 
                      className="min-h-80"
                      placeholder="Write your blog post content here..."
                      value={newBlogContent}
                      onChange={(e) => setNewBlogContent(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetBlogForm}>Cancel</Button>
                  <Button onClick={handleSaveBlog}>
                    {editingBlogId ? "Update Post" : "Save Post"}
                  </Button>
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
                  <Button onClick={resetVideoForm}>
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
                          {siteData.videos.map((video) => (
                            <tr key={video.id} className="border-b">
                              <td className="px-4 py-3">{video.title}</td>
                              <td className="px-4 py-3">{video.platform}</td>
                              <td className="px-4 py-3 text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mr-2"
                                  onClick={() => handleEditVideo(video)}
                                >
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
                  <CardTitle>{editingVideoId ? "Edit Video" : "Add New Video"}</CardTitle>
                  <CardDescription>
                    {editingVideoId ? "Update video information." : "Add a new video to your resume."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input 
                      id="video-title" 
                      placeholder="Enter video title" 
                      value={newVideoTitle}
                      onChange={(e) => setNewVideoTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-platform">Platform</Label>
                      <Select 
                        value={newVideoPlatform}
                        onValueChange={(value: "youtube" | "vimeo") => setNewVideoPlatform(value)}
                      >
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
                      <Input 
                        id="video-url" 
                        placeholder="e.g., https://www.youtube.com/embed/VIDEO_ID" 
                        value={newVideoEmbedUrl}
                        onChange={(e) => setNewVideoEmbedUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea 
                      id="video-description" 
                      className="min-h-20"
                      placeholder="Describe what this video is about..."
                      value={newVideoDescription}
                      onChange={(e) => setNewVideoDescription(e.target.value)}
                    />
                  </div>
                  {newVideoEmbedUrl && (
                    <div className="pt-4">
                      <Label>Video Preview</Label>
                      <div className="mt-2 border rounded-md overflow-hidden">
                        <div className="aspect-video">
                          <iframe 
                            src={newVideoEmbedUrl}
                            title="Video Preview"
                            className="w-full h-full"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetVideoForm}>Cancel</Button>
                  <Button onClick={handleSaveVideo}>
                    {editingVideoId ? "Update Video" : "Save Video"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User Accounts</CardTitle>
                    <CardDescription>
                      Manage user accounts for your website.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-3 text-left font-medium">Name</th>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Role</th>
                            <th className="px-4 py-3 text-right font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b">
                              <td className="px-4 py-3">{user.name}</td>
                              <td className="px-4 py-3">{user.email}</td>
                              <td className="px-4 py-3">{user.role}</td>
                              <td className="px-4 py-3 text-right">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Edit
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteUser(user.id)}
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
                  <CardTitle>Create New User</CardTitle>
                  <CardDescription>
                    Add a new user account.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleAddUser}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-name">Full Name</Label>
                      <Input 
                        id="user-name" 
                        placeholder="Enter user's full name" 
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input 
                          id="user-email" 
                          type="email" 
                          placeholder="user@example.com" 
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="user-password">Password</Label>
                        <Input 
                          id="user-password" 
                          type="password" 
                          placeholder="Create a secure password" 
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user-role">Role</Label>
                      <Select 
                        value={newUserRole} 
                        onValueChange={setNewUserRole}
                      >
                        <SelectTrigger id="user-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Create User</Button>
                  </CardFooter>
                </form>
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
                    <Input 
                      id="siteTitle" 
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input 
                      id="siteDescription" 
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">SEO Keywords</Label>
                    <Input 
                      id="keywords" 
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroVideoUrl">Hero Video URL (YouTube or Vimeo embed)</Label>
                    <Input 
                      id="heroVideoUrl" 
                      value={heroVideoUrl}
                      onChange={(e) => setHeroVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/embed/VIDEO_ID"
                    />
                  </div>
                  <div className="space-y-4 pt-2">
                    <h3 className="text-lg font-medium">WhatsApp Group</h3>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="showWhatsappSection" 
                        className="mr-1"
                        checked={showWhatsappSection}
                        onChange={(e) => setShowWhatsappSection(e.target.checked)}
                      />
                      <Label htmlFor="showWhatsappSection">Show WhatsApp Group Section</Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsappLink">WhatsApp Group Link</Label>
                      <Input 
                        id="whatsappLink" 
                        value={whatsappLink}
                        onChange={(e) => setWhatsappLink(e.target.value)}
                        placeholder="https://whatsapp.com/group/example"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    Save Settings
                  </Button>
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
