# 🧠 AI Image Generator (MERN + Generative AI)

> A production-ready full-stack AI application that generates high-quality images from text prompts using generative AI APIs. Built with the MERN stack and deployed on modern cloud infrastructure.

🔗 **Live Demo:** https://ai-image-generator-react.netlify.app/  
📦 **Backend:** Node.js + Express (Render)  
🎨 **Frontend:** React + Vite (Netlify)

---

## 🚀 Overview

This project allows users to generate AI images from text prompts. It uses a scalable MERN architecture with cloud-based image storage and AI integration.

---

## ✨ Key Features

- 🧠 AI-powered text-to-image generation
- ⚡ Real-time API response handling
- ☁️ Cloud image storage via Cloudinary
- 💾 Download generated images
- 📱 Fully responsive UI/UX
- 🔐 Secure backend API architecture
- 🌐 Production deployment (Netlify + Render)
- 🔄 RESTful API design
---

## 📸 Demo Preview

![AI Image Generator Demo](https://your-image-link.com/demo.png)
---

## 🏗️ Architecture
```
Frontend (React + Vite)
        ↓
REST API (Express.js)
        ↓
AI Services (OpenAI / GenAI APIs)
        ↓
MongoDB (Data Storage)
        ↓
Cloudinary (Image Storage)
```
## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Material UI (MUI)
- Styled Components
- Emotion UI

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- HuggingFace API / GenAI APIs
- Cloudinary (Image hosting)
- CORS
- dotenv

### Deployment
- Netlify (Frontend)
- Render (Backend)
- GitHub (Version Control)

---

## 📁 Project Structure
```
AI_Image_Generator_MERN/
│
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Backend (Node + Express)
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
│
└── README.md
```
## ⚙️ Getting Started
**1️⃣ Clone Repository**
```
git clone https://github.com/Bittu169/AI_Image_Generator_MERN.git
cd AI_Image_Generator_MERN
```
**2️⃣ Backend Setup**
```bash
cd server
npm install
```
Create .env file:
```
PORT=8080
MONGO_URI=your_mongodb_url
OPENAI_API_KEY=your_openai_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```
Run backend:
```
npm start
```
## 🌐 Production Deployment
**Frontend (Netlify)**
- Build Command: npm run build
- Publish Directory: dist
  
**Backend (Render)**
- Start Command: npm start
- Root Directory: /server

## 🔐 Security & CORS Configuration
```
app.use(cors({
  origin: "https://ai-image-generator-react.netlify.app",
  credentials: true,
}));
```
## 📊 Performance Highlights
- ⚡ Fast Vite build system
- 🚀 Optimized API response flow
- ☁️ Scalable cloud storage integration
- 🧠 Efficient AI request handling

## 🔮 Future Enhancements
- 👤 User authentication (JWT / OAuth)
- 🖼️ Prompt history & gallery
- ❤️ Save & favorite images
- 💬 AI prompt assistant (chat-based)
- 📊 Usage analytics dashboard
- 💳 Paid AI generation credits (SaaS upgrade)

## 👨‍💻 Author
**Bittu Mondal**
- GitHub: https://github.com/Bittu169
- Project: AI Image Generator (MERN + GenAI)

## ⭐ Support
If you like this project:
- ⭐ Star this repository
- 🍴 Fork it
- 🚀 Share it with others
## 📄 License

This project is licensed under the MIT License.

Copyright (c) 2026 Bittu Mondal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...

(Full MIT License text is in LICENSE file)
