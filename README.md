# Charpathaliya Plants - Research Database

A comprehensive, modern web application for documenting medicinal and aquatic plants from Charpathaliya. Built with React, Node.js, Express, and MongoDB.

## 🌿 Features

### User Side
- **Impressive Landing Page** - Full-screen hero with smooth animations
- **Plant Gallery** - Card-based grid with filtering and search
- **Detailed Plant Pages** - Comprehensive information display
- **Statistics Dashboard** - Visual representation of plant data
- **Responsive Design** - Works on mobile, tablet, and desktop

### Admin Panel
- **Secure Authentication** - JWT-based login system
- **Dashboard** - Overview with statistics and recent additions
- **CRUD Operations** - Add, edit, and delete plants
- **Image Upload** - Upload and manage plant images
- **Full Management** - Complete control over plant database

## 🚀 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Upload)
- Bcrypt (Password Hashing)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/charpathaliya-plants
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 👤 Admin Setup

### Creating the First Admin Account

I have provided a seed script to quickly set up the admin account and some sample data.

1. Navigate to backend:
```bash
cd backend
```

2. Run the seed script:
```bash
node seed.js
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

**⚠️ IMPORTANT:** Change the default credentials immediately in production!

## 🎨 Design Features

- **Nature-inspired color palette** (greens and earthy tones)
- **Smooth animations** using Framer Motion
- **Premium typography** with Google Fonts
- **Glassmorphism effects** for modern UI
- **Responsive grid layouts**
- **Loading skeletons** for better UX
- **Academic styling** for professional appearance

## 📁 Project Structure

charpathaliya-plants/
├── frontend/            # React + Vite application
│   ├── src/             # Frontend source code
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── utils/       # API utilities
│   ├── public/          # Static assets
│   └── tailwind.config.js
├── backend/             # Node + Express API
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & upload middleware
│   ├── uploads/         # Uploaded images
│   ├── seed.js          # Sample data script
│   └── server.js        # Express server
└── README.md


## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected admin routes
- File upload validation
- CORS configuration

---

**Built with ❤️ for botanical research and education**
