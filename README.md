
# Shubham Sahare - Personal Portfolio & Blog

A modern, responsive personal website for Shubham Sahare, a DevOps Engineer. This portfolio website showcases skills, experience, blog posts, and a video resume.

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Particle Background**: Interactive particle animation for visual appeal
- **Blog System**: Complete blog with individual post pages
- **Video Resume**: Embedded video player for personal introductions
- **Admin Dashboard**: Secure admin panel for content management
- **Modern UI**: Built with React, Tailwind CSS, and Shadcn UI components

## Admin Dashboard

The admin dashboard allows managing all content on the website:

### Accessing the Admin Dashboard

1. Navigate to `/admin` in the website URL
2. Login with these credentials:
   - Email: `admin@example.com`
   - Password: `password`

### Managing Content

The admin dashboard provides tools to:

- **Update Profile**: Edit personal information, skills, and bio
- **Manage Blog Posts**: Create, edit, publish, and delete blog articles
- **Video Resume**: Add, update, or remove videos from different platforms (YouTube/Vimeo)
- **Website Settings**: Modify SEO settings, site title, and other configurations
- **Security**: Change admin credentials

## Development

This project is built with:

- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Query

### Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

### Project Structure

- `/src`: Source files
  - `/components`: Reusable UI components
  - `/pages`: Main page components
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions
  - `/components/ui`: Shadcn UI components

## Deployment

### Building for Production

```
npm run build
```

This will generate optimized production files in the `/dist` directory.

### GitHub Deployment

To deploy this project to GitHub:

1. Create a new GitHub repository
2. Initialize Git in your project folder (if not already done):
   ```
   git init
   ```
3. Add your GitHub repository as a remote:
   ```
   git remote add origin https://github.com/yourusername/repository-name.git
   ```
4. Add all files:
   ```
   git add .
   ```
5. Commit changes:
   ```
   git commit -m "Initial commit"
   ```
6. Push to GitHub:
   ```
   git push -u origin main
   ```

## Customization

- **Particles**: Edit settings in `ParticleBackground.tsx`
- **Colors**: Modify theme colors in `tailwind.config.js`
- **Content**: Update mock data in respective components or connect to a backend

## Credits

- UI Components: [Shadcn UI](https://ui.shadcn.com/)
- Icons: [Lucide React](https://lucide.dev/)
- Particles: [tsParticles](https://particles.js.org/)
