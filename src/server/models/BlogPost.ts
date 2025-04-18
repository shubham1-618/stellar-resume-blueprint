
import mongoose from 'mongoose';
import { BlogPost as BlogPostType } from '@/types/siteData';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Published', 'Draft'],
    default: 'Draft',
  },
}, { timestamps: true });

export const BlogPost = mongoose.model<BlogPostType>('BlogPost', blogPostSchema);
