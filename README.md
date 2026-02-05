# 🗳️ Resilient Live Polling System

A **real-time, resilient polling system** built using **React, Node.js, Socket.IO, and MongoDB**.  
Designed for **Teacher–Student live interaction** with **state recovery**, **server-synced timers**, and **data integrity**.

---

## 🚀 Live Demo

- **Frontend**: https://your-frontend-url.vercel.app  
- **Backend**: https://your-backend-url.onrender.com  

> Replace URLs after deployment.

---

## 🧠 Features

### 👩‍🏫 Teacher (Admin)
- Create live polls with:
  - Question
  - Multiple options
  - Time duration
- View **real-time polling results**
- Poll history stored in database
- Ask a new question only when:
  - No poll is active, or
  - Previous poll is completed

---

### 👨‍🎓 Student (User)
- Enter name on first visit (stored locally)
- Instantly receive active poll
- **Server-synchronized timer**
  - Late joiners see remaining time correctly
- Vote only once per poll
- View live results after voting

---

### 💪 Resilience & Reliability
- Page refresh does **not reset state**
- Backend acts as **single source of truth**
- Prevents duplicate votes
- Handles late joiners correctly
- Graceful error handling

---

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite
- Socket.IO Client
- React Router
- Custom Hooks (`usePoll`, `useSocket`)
- Custom CSS UI

### Backend
- Node.js + Express
- Socket.IO
- MongoDB Atlas
- Mongoose
- TypeScript
- MVC + Service architecture

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 📁 Project Structure

### Backend
