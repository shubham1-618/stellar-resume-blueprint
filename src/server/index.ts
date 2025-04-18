import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './config/database';
import { authController } from './controllers/auth.controller';
import { BlogPost } from './models/BlogPost';

const app = express();
const port = 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Auth routes
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', authController.register);

// Blog routes
app.get('/api/blog', async (_, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.get('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findById(id);
    if (post) {
      res.json({ success: true, data: post });
    } else {
      res.status(404).json({ success: false, error: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/blog', async (req, res) => {
  try {
    const newPost = new BlogPost(req.body);
    await newPost.save();
    res.json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.put('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedPost) {
      res.json({ success: true, data: updatedPost });
    } else {
      res.status(404).json({ success: false, error: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.delete('/api/blog/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await BlogPost.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
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
