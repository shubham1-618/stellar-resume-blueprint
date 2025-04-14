
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, FileText, Image, Settings, User, BookOpen, Globe } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <FileText className="mr-2 h-4 w-4" />
              Projects
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Briefcase className="mr-2 h-4 w-4" />
              Experience
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Blog
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
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Last post 3 days ago</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Messages</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 unread messages</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
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
                      <Input id="jobTitle" defaultValue="Full-Stack Developer & UI/UX Designer" />
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
                    <textarea 
                      id="bio" 
                      className="w-full min-h-32 p-3 rounded-lg border border-border bg-background"
                      defaultValue="Hello! I'm Shubham, a passionate full-stack developer with a keen eye for design and a drive for creating efficient, user-friendly applications. With expertise in modern web technologies, I bring ideas to life through clean code and intuitive interfaces."
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
                    {["React", "Node.js", "TypeScript", "UI/UX Design", "Next.js", "MongoDB", "PostgreSQL", "AWS"].map((skill) => (
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
            
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>
                    Manage your website content sections.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    This section will contain interfaces for managing your portfolio items, 
                    projects, experience timeline, and blog posts. Content editing functionality 
                    will be implemented in future updates.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-32 flex flex-col">
                      <Globe className="h-8 w-8 mb-2" />
                      <span>Portfolio Items</span>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col">
                      <FileText className="h-8 w-8 mb-2" />
                      <span>Projects</span>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col">
                      <Briefcase className="h-8 w-8 mb-2" />
                      <span>Experience</span>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col">
                      <BookOpen className="h-8 w-8 mb-2" />
                      <span>Blog Posts</span>
                    </Button>
                  </div>
                </CardContent>
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
                    <Input id="siteTitle" defaultValue="Shubham Sahare - Full-Stack Developer" />
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
                      defaultValue="developer, full-stack, UI/UX, web development, portfolio" 
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
