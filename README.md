![PublishPro](public/publishpro.png)

# Project Overview
### Project Name: PublishPro(frontend)
**Description:** PublishPro is a full-stack, enterprise-grade Content Management System (CMS) engineered for scalable, secure, and collaborative digital publishing. Designed with a role-based architecture, the platform empowers organizations to manage complex content workflows across multiple user hierarchies — Admins, Editors, and Writers — with precision and control.

Built on a modern web stack, PublishPro delivers a comprehensive content lifecycle, enabling seamless drafting, editing, publishing, archiving, restoring, and deletion of articles. Its Medium-style WYSIWYG editor provides a rich, distraction-free writing environment, empowering creators with intuitive formatting tools and a fluid authoring experience.

The system emphasizes security, scalability, and usability, combining robust authentication and authorization mechanisms with RESTful API architecture, optimized database operations, and a fully responsive Bootstrap-powered UI. PublishPro stands as a production-ready CMS solution built for performance, governance, and content excellence.

### 🚀 Key Features

🔐 Advanced Authentication & Role-Based Authorization – Implemented secure user authentication and granular access control, ensuring protected workflows for Admins, Editors, and Writers.

📝 Integrated Medium-Style Rich Text Editor – Built a powerful WYSIWYG editor supporting modern formatting, embedded media, and structured content creation for a professional writing experience.

🔄 End-to-End Content Lifecycle Management – Architected a robust workflow that enables users to seamlessly draft, edit, publish, archive, restore, and permanently delete content while maintaining version integrity.

🧭 Comprehensive Admin Dashboard – Developed a fully functional control panel for administrators to manage users, assign roles, monitor activities, and oversee publishing pipelines with real-time insights.

💡 Responsive & Accessible UI/UX – Designed a sleek, device-agnostic interface using React and Bootstrap, ensuring optimal usability, accessibility, and fluid navigation across all user roles.

⚙️ High-Performance RESTful API Layer – Engineered an Express.js backend with modular routing and optimized MongoDB queries, delivering scalability, speed, and reliable data persistence.

🧩 Production-Ready Architecture – Built with extensibility in mind, supporting future enhancements such as analytics, editorial workflow automation, and AI-assisted content recommendations.

## Repository/Project Information
**Version:** `0.01`  
**Last Release Date:** `18/08/2025`  
**Latest Stable Branch:** `main`  
**Active Development Branch:** `development`  
**Hosted Link:** `https://publishpro-mu.vercel.app`  
**Backend Repo:** `https://github.com/naeemmahmud70/cms-backend`

## Build Instructions

**1. Clone the Repository**  
Run the following commands in your terminal:

```bash
 git clone https://github.com/naeemmahmud70/blog-cms-frontend
 cd blog-cms-frontend
```

**2. Install Dependencies**  
Use one of the following commands to install project dependencies:

```bash
 # Using npm
 npm install

 # OR using yarn
 yarn install
```

**3. Configure Environment Variables**  
Create a `.env` file in the root directory and add the following example configuration:

```bash
VITE_BASE_URL=https://cms-backend-jl6b.onrender.com/api
VITE_IMAGE_HOSTING_KEY=c27cdbd7f672caa5d177ddecda022824
 ```
Do not commit this file. Make sure it is listed in your `.gitignore`.

**4. Build the App (if using TypeScript or build step)**  
If your project requires a build step, run:

```bash
 npm run build
 # OR
 yarn build
```

**5. Run the App**  
Use one of the following commands to start the server:

```bash
 # For production
  npm start

 # For development with hot-reloading
 npm run dev
 # OR
 yarn dev
```
**6. Troubleshooting Tips**  
 - Ensure Node.js and npm/yarn are installed: `node -v` and `npm -v`
 - If you are facing issue while installing npm install then try with npm install –force
 - Check for missing environment variables or file misconfigurations