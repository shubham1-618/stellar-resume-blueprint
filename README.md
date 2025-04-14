
# Shubham Sahare - DevOps Engineer Portfolio

![Project Preview](https://via.placeholder.com/1200x630/0a0a0a/FFFFFF?text=Shubham+Sahare+DevOps+Expert)

## Overview

A stunning, interactive personal portfolio website for Shubham Sahare, a DevOps Engineer and Cloud Infrastructure Specialist. The website features a modern UI with particle effects, smooth animations, and a comprehensive showcase of DevOps expertise, projects, and professional experience.

## Live Demo

[View Live Demo](https://yourdomain.com) (Replace with your actual deployment URL)

## Features

- **Interactive Design**: Particle effects, smooth scrolling, and animations
- **Responsive Layout**: Optimized for all device sizes from mobile to desktop
- **Video Background**: With mute/unmute functionality
- **DevOps Focus**: Sections highlighting infrastructure projects, CI/CD pipelines, and cloud architecture
- **Professional Timeline**: Interactive work experience timeline
- **Blog Section**: Showcase for technical articles and insights
- **Contact Form**: Integrated contact form for inquiries
- **Admin Dashboard**: Secure admin area for content management

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS animations
- **UI Components**: shadcn/ui
- **State Management**: React Query
- **Animations**: Particle effects via tsparticles
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shubham-sahare-portfolio.git
   cd shubham-sahare-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Admin Dashboard Usage

The admin dashboard provides a secure interface to manage your website content.

### Accessing the Dashboard

1. Navigate to `/admin` in your browser
2. Login with your credentials:
   - Default username: admin@example.com
   - Default password: admin123
   (Be sure to change these in a production environment!)

### Dashboard Features

The admin dashboard allows you to:

- **Update Profile Information**: Change your name, title, bio, and profile picture
- **Manage Skills**: Add, edit, or remove skills from your profile
- **Portfolio Management**: Add new projects or edit existing ones
- **Experience Timeline**: Update your work history
- **Blog Management**: Create, edit, and publish blog posts
- **Message Center**: View and respond to messages sent through the contact form

### Content Management Tips

- Images should be optimized before upload (recommended max size: 1MB)
- For best performance, use WebP format for images
- When adding new projects, include relevant tags for proper filtering
- Blog posts support Markdown formatting for rich content

## Customization

### Profile Information

Edit the data files in `src/data/` to update your personal information:

- `profile.ts`: Basic information and bio
- `skills.ts`: Your technical skills
- `projects.ts`: Portfolio projects
- `experience.ts`: Work experience
- `blog.ts`: Blog posts

### Styling and Themes

The color scheme and design elements can be customized in:

- `tailwind.config.ts`: Update colors and theme variables
- `src/index.css`: Modify global styles

### Adding Custom Sections

To add new sections to the website:

1. Create a new component in `src/components/`
2. Add the component to the main layout in `src/pages/Index.tsx`
3. Update the navigation menu to include the new section

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` folder with the optimized production build.

### Deployment Options

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Set up continuous deployment from GitHub
- **GitHub Pages**: Deploy static build directly
- **AWS S3/CloudFront**: For scalable static hosting with CDN

## Uploading to GitHub

### Setting Up a New Repository

1. Create a new repository on GitHub
2. Initialize Git in your project (if not already done):
   ```bash
   git init
   ```

3. Add your remote repository:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   ```

4. Add, commit, and push your files:
   ```bash
   git add .
   git commit -m "Initial commit: Portfolio website"
   git push -u origin main
   ```

### GitHub Pages Deployment

To deploy to GitHub Pages:

1. In your repository settings, enable GitHub Pages
2. Set the source to the `gh-pages` branch
3. Add a custom domain if desired
4. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

5. Add deployment scripts to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

6. Deploy your site:
   ```bash
   npm run deploy
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Shubham Sahare - [shubham.sahare@example.com](mailto:shubham.sahare@example.com)

Project Link: [https://github.com/your-username/shubham-sahare-portfolio](https://github.com/your-username/shubham-sahare-portfolio)
