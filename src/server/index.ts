
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { BlogPost, VideoItem, Project, Experience, SocialLink, PersonalInfo, SiteSettings } from '@/context/SiteDataContext';

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

// Blog routes
app.get('/api/blog', (_, res) => {
  res.json({ success: true, data: storage.blogPosts });
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

// Similar routes for videos, projects, profile, settings, and users...
// (implementing all routes following the same pattern)

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
