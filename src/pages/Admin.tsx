
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
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  const { siteData, updatePersonalInfo, updateBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost, 
          updateVideos, addVideo, updateVideo, deleteVideo, updateSiteSettings } = useSiteData();

  // User management states
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com", password: "password", role: "Admin" },
    { id: 2, name: "Content Manager", email: "manager@example.com", password: "password", role: "Editor" },
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
  const [newBlogStatus, setNewBlogStatus] = useState<"Published" | "Draft">("Draft");
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
    
    // Check credentials against users array
    const foundUser = users.find(user => user.email === email && user.password === password);
    
    if (foundUser) {
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      toast({
        title: "Registration Error",
        description: "Email already registered",
        variant: "destructive",
      });
      return;
    }
    
    // Create new user
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    const newUser = {
      id: newId,
      name: fullName,
      email,
      password,
      role: "Editor" // Default role for new registrations
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "Registration successful",
      description: "You can now log in with your credentials",
    });
    
    // Switch to login mode
    setAuthMode("login");
    
    // Clear form
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Blog management functions
  const handleDeleteBlog = (id: number) => {
    deleteBlogPost(id);
    toast({
      title: "Blog post deleted",
      description: "The blog post has been successfully deleted",
    });
  };

  const handleBlogStatusChange = (id: number, status: "Published" | "Draft") => {
    updateBlogPost(id, { status });
    toast({
      title: `Blog post ${status.toLowerCase()}`,
      description: `The blog post has been ${status.toLowerCase()}`,
    });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlogId(blog.id);
    setNewBlogTitle(blog.title);
    setNewBlogExcerpt(blog.excerpt);
    setNewBlogCategory(blog.category);
    setNewBlogContent(blog.content);
    setNewBlogDate(blog.date);
    setNewBlogStatus(blog.status);
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
        date: newBlogDate || today,
        status: newBlogStatus
      });
      
      toast({
        title: "Blog post updated",
        description: "The blog post has been successfully updated",
      });
    } else {
      // Add new blog
      addBlogPost({
        title: newBlogTitle,
        excerpt: newBlogExcerpt,
        category: newBlogCategory,
        content: newBlogContent,
        date: newBlogDate || today,
        status: newBlogStatus
      });
      
      toast({
        title: "Blog post created",
        description: "A new blog post has been created successfully",
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
    setNewBlogStatus("Draft");
  };

  // Video management functions
  const handleDeleteVideo = (id: number) => {
    deleteVideo(id);
    toast({
      title: "Video deleted",
      description: "The video has been successfully deleted",
    });
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
      
      toast({
        title: "Video updated",
        description: "The video has been successfully updated",
      });
    } else {
      // Add new video
      addVideo({
        title: newVideoTitle,
        description: newVideoDescription,
        platform: newVideoPlatform,
        embedUrl: newVideoEmbedUrl
      });
      
      toast({
        title: "Video added",
        description: "A new video has been added successfully",
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
    
    // Check if email already exists
    if (users.some(user => user.email === newUserEmail)) {
      toast({
        title: "Error",
        description: "A user with this email already exists",
        variant: "destructive",
      });
      return;
    }
    
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([...users, {
      id: newId,
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
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
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white p-4">
        <Card className="w-full max-w-md bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Dashboard</CardTitle>
            <CardDescription className="text-center text-white/70">
              {authMode === "login" 
                ? "Login to manage your personal website content" 
                : "Create a new admin account"}
            </CardDescription>
          </CardHeader>
          
          {authMode === "login" ? (
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                >
                  Login
                </Button>
                <p className="text-sm text-center text-white/70">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    className="text-[#9b87f5] hover:text-[#D6BCFA] transition-colors"
                    onClick={() => setAuthMode("register")}
                  >
                    Register
                  </button>
                </p>
              </CardFooter>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/90">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerEmail" className="text-white/90">Email</Label>
                  <Input 
                    id="registerEmail" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword" className="text-white/90">Password</Label>
                  <Input 
                    id="registerPassword" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                >
                  Register
                </Button>
                <p className="text-sm text-center text-white/70">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    className="text-[#9b87f5] hover:text-[#D6BCFA] transition-colors"
                    onClick={() => setAuthMode("login")}
                  >
                    Login
                  </button>
                </p>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r border-white/10 bg-gradient-to-b from-[#1A1F2C] to-[#0F172A]">
          <div className="px-6 py-6">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Dashboard</h2>
            <p className="text-sm text-white/60">Manage your website content</p>
          </div>
          <Separator className="bg-white/10" />
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <Globe className="mr-2 h-4 w-4" />
              Portfolio
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Blog
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <Video className="mr-2 h-4 w-4" />
              Video Resume
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <Users className="mr-2 h-4 w-4" />
              User Accounts
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <Image className="mr-2 h-4 w-4" />
              Media
            </Button>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
          <div className="p-4 mt-auto">
            <Button 
              variant="outline" 
              className="w-full border-white/10 text-white hover:bg-white/10" 
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
          <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA]">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Total Views</CardTitle>
                <Globe className="h-4 w-4 text-white/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-white/60">+12% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Blog Posts</CardTitle>
                <BookOpen className="h-4 w-4 text-white/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{siteData.blogPosts.length}</div>
                <p className="text-xs text-white/60">Last post 3 days ago</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/90">Videos</CardTitle>
                <Video className="h-4 w-4 text-white/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{siteData.videos.length}</div>
                <p className="text-xs text-white/60">Last video added 1 week ago</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="profile" className="text-white">
            <TabsList className="mb-6 bg-white/5 text-white">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Profile</TabsTrigger>
              <TabsTrigger value="blog" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Blog</TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Video Resume</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Users</TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription className="text-white/70">
                    Update your personal information and contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white/90">Full Name</Label>
                      <Input 
                        id="fullName" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-white/90">Job Title</Label>
                      <Input 
                        id="jobTitle" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/90">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={personalEmail}
                        onChange={(e) => setPersonalEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white/90">Location</Label>
                      <Input 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profileImage" className="text-white/90">Profile Image URL</Label>
                      <Input 
                        id="profileImage" 
                        value={profileImageUrl}
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resumeUrl" className="text-white/90">Resume URL (PDF)</Label>
                      <Input 
                        id="resumeUrl" 
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        placeholder="https://example.com/resume.pdf"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-white/90">Bio</Label>
                    <Textarea 
                      id="bio" 
                      className="min-h-32 bg-white/5 border-white/10 text-white"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSavePersonalInfo}
                    className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription className="text-white/70">
                    Add or remove your technical skills.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 px-3 py-1 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-sm border border-[#9b87f5]/20">
                        {skill}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 p-0 text-[#9b87f5] hover:text-[#D6BCFA] hover:bg-transparent"
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
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <Button 
                      onClick={handleAddSkill}
                      className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                    >
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blog" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription className="text-white/70">
                      Manage your blog posts and articles.
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={resetBlogForm}
                    className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                  >
                    New Post
                  </Button>
                </CardHeader>
                <CardContent>
                  {/* Blog post form */}
                  <div className="space-y-4 mb-8 bg-white/5 p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="blogTitle" className="text-white/90">Title</Label>
                      <Input 
                        id="blogTitle" 
                        value={newBlogTitle}
                        onChange={(e) => setNewBlogTitle(e.target.value)}
                        placeholder="Enter blog title"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blogExcerpt" className="text-white/90">Excerpt</Label>
                      <Textarea 
                        id="blogExcerpt" 
                        value={newBlogExcerpt}
                        onChange={(e) => setNewBlogExcerpt(e.target.value)}
                        placeholder="Short description of the blog post"
                        className="h-20 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="blogCategory" className="text-white/90">Category</Label>
                        <Select 
                          value={newBlogCategory} 
                          onValueChange={setNewBlogCategory}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1F2C] text-white border-white/10">
                            <SelectItem value="DevOps">DevOps</SelectItem>
                            <SelectItem value="Cloud">Cloud</SelectItem>
                            <SelectItem value="Kubernetes">Kubernetes</SelectItem>
                            <SelectItem value="Docker">Docker</SelectItem>
                            <SelectItem value="CI/CD">CI/CD</SelectItem>
                            <SelectItem value="Automation">Automation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blogDate" className="text-white/90">Date</Label>
                        <Input 
                          id="blogDate" 
                          type="date" 
                          value={newBlogDate}
                          onChange={(e) => setNewBlogDate(e.target.value)}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blogStatus" className="text-white/90">Status</Label>
                        <Select 
                          value={newBlogStatus} 
                          onValueChange={(val) => setNewBlogStatus(val as "Published" | "Draft")}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1F2C] text-white border-white/10">
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="blogContent" className="text-white/90">Content</Label>
                      <Textarea 
                        id="blogContent" 
                        value={newBlogContent}
                        onChange={(e) => setNewBlogContent(e.target.value)}
                        placeholder="Write your blog post content here..."
                        className="min-h-40 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveBlog}
                        className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                      >
                        {editingBlogId ? "Update" : "Create"} Post
                      </Button>
                    </div>
                  </div>
                  
                  {/* Blog posts list */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Existing Posts</h3>
                    {siteData.blogPosts.length > 0 ? (
                      siteData.blogPosts.map((post) => (
                        <div key={post.id} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium">{post.title}</h4>
                            <div className="text-sm text-white/60 mb-2">
                              {post.date} · {post.category} · 
                              <span className={`ml-2 ${post.status === "Published" ? "text-green-400" : "text-amber-400"}`}>
                                {post.status}
                              </span>
                            </div>
                            <p className="text-white/70 text-sm line-clamp-1">{post.excerpt}</p>
                          </div>
                          <div className="flex mt-3 md:mt-0 space-x-2 md:self-start">
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-white/10 text-white hover:bg-white/10"
                              onClick={() => handleEditBlog(post)}
                            >
                              Edit
                            </Button>
                            {post.status === "Published" ? (
                              <Button 
                                variant="outline"
                                size="sm"
                                className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                                onClick={() => handleBlogStatusChange(post.id, "Draft")}
                              >
                                Unpublish
                              </Button>
                            ) : (
                              <Button 
                                variant="outline"
                                size="sm"
                                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                                onClick={() => handleBlogStatusChange(post.id, "Published")}
                              >
                                Publish
                              </Button>
                            )}
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteBlog(post.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white/5 p-4 rounded-lg text-center text-white/60">
                        No blog posts yet. Create your first post!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Video Resume</CardTitle>
                    <CardDescription className="text-white/70">
                      Manage your video resume and presentations.
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={resetVideoForm}
                    className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                  >
                    Add Video
                  </Button>
                </CardHeader>
                <CardContent>
                  {/* Video form */}
                  <div className="space-y-4 mb-8 bg-white/5 p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="videoTitle" className="text-white/90">Title</Label>
                      <Input 
                        id="videoTitle" 
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        placeholder="Enter video title"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="videoDescription" className="text-white/90">Description</Label>
                      <Textarea 
                        id="videoDescription" 
                        value={newVideoDescription}
                        onChange={(e) => setNewVideoDescription(e.target.value)}
                        placeholder="Description of what the video is about"
                        className="h-20 bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="videoPlatform" className="text-white/90">Platform</Label>
                        <Select 
                          value={newVideoPlatform} 
                          onValueChange={(val) => setNewVideoPlatform(val as "youtube" | "vimeo")}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#1A1F2C] text-white border-white/10">
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="vimeo">Vimeo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="videoEmbedUrl" className="text-white/90">Embed URL</Label>
                        <Input 
                          id="videoEmbedUrl" 
                          value={newVideoEmbedUrl}
                          onChange={(e) => setNewVideoEmbedUrl(e.target.value)}
                          placeholder={`${newVideoPlatform === 'youtube' ? 'https://www.youtube.com/embed/...' : 'https://player.vimeo.com/video/...'}`}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSaveVideo}
                        className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                      >
                        {editingVideoId ? "Update" : "Add"} Video
                      </Button>
                    </div>
                  </div>
                  
                  {/* Videos list */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Existing Videos</h3>
                    {siteData.videos.length > 0 ? (
                      siteData.videos.map((video) => (
                        <div key={video.id} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium">{video.title}</h4>
                            <div className="text-sm text-white/60 mb-2">
                              Platform: <span className="capitalize">{video.platform}</span>
                            </div>
                            <p className="text-white/70 text-sm line-clamp-2">{video.description}</p>
                          </div>
                          <div className="flex mt-3 md:mt-0 space-x-2 md:self-start">
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-white/10 text-white hover:bg-white/10"
                              onClick={() => handleEditVideo(video)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteVideo(video.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white/5 p-4 rounded-lg text-center text-white/60">
                        No videos yet. Add your first video!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription className="text-white/70">
                    Manage user accounts and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* User form */}
                  <form onSubmit={handleAddUser} className="space-y-4 mb-8 bg-white/5 p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="userName" className="text-white/90">Full Name</Label>
                      <Input 
                        id="userName" 
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Enter user's full name"
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="userEmail" className="text-white/90">Email</Label>
                        <Input 
                          id="userEmail" 
                          type="email"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          placeholder="user@example.com"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="userPassword" className="text-white/90">Password</Label>
                        <Input 
                          id="userPassword" 
                          type="password"
                          value={newUserPassword}
                          onChange={(e) => setNewUserPassword(e.target.value)}
                          placeholder="Set a strong password"
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userRole" className="text-white/90">Role</Label>
                      <Select 
                        value={newUserRole} 
                        onValueChange={setNewUserRole}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1F2C] text-white border-white/10">
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        type="submit"
                        className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                      >
                        Add User
                      </Button>
                    </div>
                  </form>
                  
                  {/* Users list */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Existing Users</h3>
                    <div className="space-y-3">
                      {users.map((user) => (
                        <div key={user.id} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium">{user.name}</h4>
                            <div className="text-sm text-white/60 mb-1">{user.email}</div>
                            <div className="inline-block px-2 py-0.5 text-xs rounded-full bg-[#9b87f5]/10 text-[#9b87f5]">
                              {user.role}
                            </div>
                          </div>
                          <div className="flex mt-3 md:mt-0 space-x-2 md:self-start">
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription className="text-white/70">
                    Configure general website settings and SEO.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteTitle" className="text-white/90">Site Title</Label>
                      <Input 
                        id="siteTitle" 
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroVideoUrl" className="text-white/90">Hero Video URL</Label>
                      <Input 
                        id="heroVideoUrl" 
                        value={heroVideoUrl}
                        onChange={(e) => setHeroVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                        className="bg-white/5 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription" className="text-white/90">Site Description</Label>
                    <Textarea 
                      id="siteDescription" 
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      className="h-20 bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seoKeywords" className="text-white/90">SEO Keywords</Label>
                    <Input 
                      id="seoKeywords" 
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      placeholder="devops, cloud, kubernetes, automation"
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-xs text-white/60">Separate keywords with commas</p>
                  </div>
                  <div className="space-y-4 pt-2">
                    <Label className="text-lg text-white/90">WhatsApp Integration</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="whatsappLink" className="text-white/90">WhatsApp Group Link</Label>
                        <Input 
                          id="whatsappLink" 
                          value={whatsappLink}
                          onChange={(e) => setWhatsappLink(e.target.value)}
                          placeholder="https://chat.whatsapp.com/..."
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-2 flex items-center">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="showWhatsappSection"
                            checked={showWhatsappSection}
                            onChange={(e) => setShowWhatsappSection(e.target.checked)}
                            className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#9b87f5]"
                          />
                          <Label htmlFor="showWhatsappSection" className="text-white/90">
                            Show WhatsApp Section on Homepage
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleSaveSettings}
                    className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#9b87f5] border-none"
                  >
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

