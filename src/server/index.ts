
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/User';
import { BlogPost } from './models/BlogPost';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// In-memory storage for demo purposes
const inMemoryStorage = {
  blogPosts: [] as any[],
  users: [] as any[],
  personalInfo: {
    name: 'Admin User',
    jobTitle: 'DevOps Engineer',
    email: 'admin@example.com',
    location: 'San Francisco, CA',
    profileImageUrl: 'https://github.com/shadcn.png',
    resumeUrl: 'https://example.com/resume.pdf',
    bio: 'Experienced DevOps engineer with expertise in cloud infrastructure, CI/CD pipelines, and automation.',
    skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform', 'Ansible']
  },
  siteSettings: {
    siteTitle: 'DevOps Portfolio',
    siteDescription: 'Professional portfolio showcasing DevOps projects and skills',
    heroVideoUrl: 'https://www.youtube.com/embed/example',
    seoKeywords: 'devops, kubernetes, cloud, automation',
    whatsappLink: 'https://chat.whatsapp.com/example',
    showWhatsappSection: true
  }
};

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication middleware
const authenticateToken = (req: Request & { user?: any }, res: Response, next: Function) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;
    const user = await User.create({ email, password, fullName });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Blog routes
app.get('/api/blog', async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/blog', authenticateToken, async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.put('/api/blog/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.delete('/api/blog/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: 'Post not found' });
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Profile routes
app.get('/api/profile', (req: Request, res: Response) => {
  res.json({ success: true, data: inMemoryStorage.personalInfo });
});

app.put('/api/profile', authenticateToken, (req: Request, res: Response) => {
  inMemoryStorage.personalInfo = { ...inMemoryStorage.personalInfo, ...req.body };
  res.json({ success: true, data: inMemoryStorage.personalInfo });
});

// Settings routes
app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ success: true, data: inMemoryStorage.siteSettings });
});

app.put('/api/settings', authenticateToken, (req: Request, res: Response) => {
  inMemoryStorage.siteSettings = { ...inMemoryStorage.siteSettings, ...req.body };
  res.json({ success: true, data: inMemoryStorage.siteSettings });
});

// Users routes
app.get('/api/users', authenticateToken, async (req: Request & { user?: any }, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// DB connection and server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});
