import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthForm } from "@/components/admin/auth/AuthForm";
import { Header } from "@/components/admin/Header";
import { Sidebar } from "@/components/admin/Sidebar";
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSiteData } from "@/contexts/SiteDataContext";

const Admin = () => {
  const { toast } = useToast();
  const { siteData, addBlogPost, updateBlogPost, deleteBlogPost, updatePersonalInfo, updateSiteSettings } = useSiteData();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [location, setLocation] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogExcerpt, setNewBlogExcerpt] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("");
  const [newBlogDate, setNewBlogDate] = useState("");
  const [newBlogStatus, setNewBlogStatus] = useState<"Published" | "Draft">("Draft");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [users, setUsers] = useState<any[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("");

  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [heroVideoUrl, setHeroVideoUrl] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [showWhatsappSection, setShowWhatsappSection] = useState(false);

  useEffect(() => {
    if (siteData) {
      setName(siteData.personalInfo.name || "");
      setJobTitle(siteData.personalInfo.jobTitle || "");
      setPersonalEmail(siteData.personalInfo.email || "");
      setLocation(siteData.personalInfo.location || "");
      setProfileImageUrl(siteData.personalInfo.profileImageUrl || "");
      setResumeUrl(siteData.personalInfo.resumeUrl || "");
      setBio(siteData.personalInfo.bio || "");
      setSkills(siteData.personalInfo.skills || []);
      
      setSiteTitle(siteData.siteSettings.siteTitle || "");
      setSiteDescription(siteData.siteSettings.siteDescription || "");
      setHeroVideoUrl(siteData.siteSettings.heroVideoUrl || "");
      setSeoKeywords(siteData.siteSettings.seoKeywords || "");
      setWhatsappLink(siteData.siteSettings.whatsappLink || "");
      setShowWhatsappSection(siteData.siteSettings.showWhatsappSection || false);
    }
  }, [siteData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    toast({
      title: "Login successful",
      description: "Welcome to your WordPress-like CMS dashboard!",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    setAuthMode("login");
    toast({
      title: "Registration successful",
      description: "You can now log in with your credentials",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const handleSavePersonalInfo = () => {
    updatePersonalInfo({
      name,
      jobTitle,
      email: personalEmail,
      location,
      profileImageUrl,
      resumeUrl,
      bio,
      skills
    });
    
    toast({
      title: "Changes saved",
      description: "Your profile information has been updated",
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      toast({
        title: "Skill added",
        description: `${newSkill.trim()} has been added to your skills`,
      });
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
    toast({
      title: "Skill removed",
      description: `${skill} has been removed from your skills`,
    });
  };

  const resetBlogForm = () => {
    setNewBlogTitle("");
    setNewBlogExcerpt("");
    setNewBlogCategory("");
    setNewBlogDate("");
    setNewBlogStatus("Draft");
    setNewBlogContent("");
    setEditingBlogId(null);
  };

  const handleSaveBlog = () => {
    const blogData = {
      title: newBlogTitle,
      excerpt: newBlogExcerpt,
      content: newBlogContent,
      date: newBlogDate || new Date().toISOString().split('T')[0],
      category: newBlogCategory || "Uncategorized",
      status: newBlogStatus
    };
    
    if (editingBlogId) {
      updateBlogPost(parseInt(editingBlogId), blogData);
    } else {
      addBlogPost(blogData);
    }
    
    toast({
      title: editingBlogId ? "Blog updated" : "Blog created",
      description: editingBlogId 
        ? "Your blog post has been updated successfully" 
        : "Your blog post has been created successfully",
    });
    resetBlogForm();
  };

  const handleEditBlog = (blog: any) => {
    setNewBlogTitle(blog.title);
    setNewBlogExcerpt(blog.excerpt);
    setNewBlogCategory(blog.category);
    setNewBlogDate(blog.date);
    setNewBlogStatus(blog.status as "Published" | "Draft");
    setNewBlogContent(blog.content);
    setEditingBlogId(blog.id.toString());
    toast({
      title: "Editing blog",
      description: `Now editing "${blog.title}"`,
    });
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlogPost(parseInt(id));
    toast({
      title: "Blog deleted",
      description: "The blog post has been deleted",
    });
  };

  const handleBlogStatusChange = (id: string, newStatus: "Published" | "Draft") => {
    updateBlogPost(parseInt(id), { status: newStatus });
    toast({
      title: `Blog ${newStatus === "Published" ? "published" : "unpublished"}`,
      description: `The blog post status is now ${newStatus}`,
    });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: Date.now().toString(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole
    };
    setUsers([...users, newUser]);
    
    toast({
      title: "User added",
      description: `${newUserName} has been added as a ${newUserRole}`,
    });
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserRole("");
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been deleted",
    });
  };

  const handleSaveSettings = () => {
    updateSiteSettings({
      siteTitle,
      siteDescription,
      seoKeywords,
      whatsappLink,
      showWhatsappSection,
      heroVideoUrl
    });
    
    toast({
      title: "Settings saved",
      description: "Your site settings have been updated",
    });
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    let tabValue = section;
    if (section === 'dashboard') tabValue = 'profile';
    if (section === 'appearance' || section === 'media' || section === 'videos' || section === 'projects') {
      tabValue = 'settings';
    }
    
    const tabElement = document.querySelector(`[data-state="inactive"][data-value="${tabValue}"]`) as HTMLElement;
    if (tabElement) {
      tabElement.click();
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthForm 
        mode={authMode}
        onSubmit={authMode === "login" ? handleLogin : handleRegister}
        onModeChange={() => setAuthMode(authMode === "login" ? "register" : "login")}
        formData={formData}
        onInputChange={handleInputChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white">
      <div className="flex">
        <Sidebar 
          onSectionChange={handleSectionChange}
          onLogout={handleLogout}
          activeSection={activeSection}
        />

        <main className="flex-1 md:ml-64 p-6">
          <Header />

          <Tabs defaultValue="profile" className="text-white">
            <TabsList className="mb-6 bg-white/5 text-white sticky top-0 z-10">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Profile</TabsTrigger>
              <TabsTrigger value="blog" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Blog</TabsTrigger>
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
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Existing Posts</h3>
                    {siteData.blogPosts.length > 0 ? (
                      siteData.blogPosts.map((post) => (
                        <div key={post.id.toString()} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row justify-between">
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
                                onClick={() => handleBlogStatusChange(post.id.toString(), "Draft")}
                              >
                                Unpublish
                              </Button>
                            ) : (
                              <Button 
                                variant="outline"
                                size="sm"
                                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                                onClick={() => handleBlogStatusChange(post.id.toString(), "Published")}
                              >
                                Publish
                              </Button>
                            )}
                            <Button 
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDeleteBlog(post.id.toString())}
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
            
            <TabsContent value="users" className="space-y-6">
              <Card className="bg-gradient-to-br from-[#1A1F2C] to-[#0F172A] border border-white/10 text-white">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription className="text-white/70">
                    Manage user accounts and permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
