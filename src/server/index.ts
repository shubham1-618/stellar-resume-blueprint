import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { BlogPost, VideoItem, Project, Experience, SocialLink, PersonalInfo, SiteSettings } from '@/types/siteData';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple in-memory storage (replace with a real database in production)
let storage = {
  users: [],
  blogPosts: [],
  videos: [],
  projects: [],
  experience: [],
  socialLinks: [],
  personalInfo: null,
  siteSettings: null,
};

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // Implement proper authentication here
  res.json({
    success: true,
    data: {
      token: 'dummy-token',
      user: { id: '1', email, fullName: 'Admin User', role: 'admin' }
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, fullName } = req.body;
  // In a real app, you would hash the password and store user data
  res.json({
    success: true,
    data: {
      token: 'dummy-token',
      user: { id: Date.now().toString(), email, fullName, role: 'user' }
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  // In a real app, you would invalidate the token
  res.json({ success: true });
});

// Blog routes
app.get('/api/blog', (_, res) => {
  res.json({ success: true, data: storage.blogPosts });
});

app.get('/api/blog/:id', (req, res) => {
  const { id } = req.params;
  const post = storage.blogPosts.find(post => post.id === parseInt(id));
  if (post) {
    res.json({ success: true, data: post });
  } else {
    res.status(404).json({ success: false, error: 'Blog post not found' });
  }
});

app.post('/api/blog', (req, res) => {
  const newPost = { ...req.body, id: Date.now() };
  storage.blogPosts.push(newPost);
  res.json({ success: true, data: newPost });
});

app.put('/api/blog/:id', (req, res) => {
  const { id } = req.params;
  storage.blogPosts = storage.blogPosts.map(post =>
    post.id === parseInt(id) ? { ...post, ...req.body } : post
  );
  res.json({ success: true, data: storage.blogPosts.find(post => post.id === parseInt(id)) });
});

app.delete('/api/blog/:id', (req, res) => {
  const { id } = req.params;
  storage.blogPosts = storage.blogPosts.filter(post => post.id !== parseInt(id));
  res.json({ success: true });
});

// Media routes
app.get('/api/media/videos', (_, res) => {
  res.json({ success: true, data: storage.videos });
});

app.post('/api/media/videos', (req, res) => {
  const newVideo = { ...req.body, id: Date.now() };
  storage.videos.push(newVideo);
  res.json({ success: true, data: newVideo });
});

app.put('/api/media/videos/:id', (req, res) => {
  const { id } = req.params;
  storage.videos = storage.videos.map(video =>
    video.id === parseInt(id) ? { ...video, ...req.body } : video
  );
  res.json({ success: true, data: storage.videos.find(video => video.id === parseInt(id)) });
});

app.delete('/api/media/videos/:id', (req, res) => {
  const { id } = req.params;
  storage.videos = storage.videos.filter(video => video.id !== parseInt(id));
  res.json({ success: true });
});

// Project routes
app.get('/api/projects', (_, res) => {
  res.json({ success: true, data: storage.projects });
});

app.post('/api/projects', (req, res) => {
  const newProject = { ...req.body, id: Date.now() };
  storage.projects.push(newProject);
  res.json({ success: true, data: newProject });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  storage.projects = storage.projects.map(project =>
    project.id === parseInt(id) ? { ...project, ...req.body } : project
  );
  res.json({ success: true, data: storage.projects.find(project => project.id === parseInt(id)) });
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  storage.projects = storage.projects.filter(project => project.id !== parseInt(id));
  res.json({ success: true });
});

// Profile routes
app.get('/api/profile', (_, res) => {
  res.json({ success: true, data: storage.personalInfo });
});

app.put('/api/profile', (req, res) => {
  storage.personalInfo = req.body;
  res.json({ success: true, data: storage.personalInfo });
});

app.put('/api/profile/social', (req, res) => {
  storage.socialLinks = req.body;
  res.json({ success: true, data: storage.socialLinks });
});

app.put('/api/profile/experience', (req, res) => {
  storage.experience = req.body;
  res.json({ success: true, data: storage.experience });
});

// Settings routes
app.get('/api/settings', (_, res) => {
  res.json({ success: true, data: storage.siteSettings });
});

app.put('/api/settings', (req, res) => {
  storage.siteSettings = { ...storage.siteSettings, ...req.body };
  res.json({ success: true, data: storage.siteSettings });
});

// User routes
app.get('/api/users', (_, res) => {
  res.json({ success: true, data: storage.users });
});

app.post('/api/users', (req, res) => {
  const newUser = { ...req.body, id: Date.now() };
  storage.users.push(newUser);
  res.json({ success: true, data: newUser });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  storage.users = storage.users.filter(user => user.id !== parseInt(id));
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
