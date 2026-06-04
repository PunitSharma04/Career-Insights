# Career Insights 🚀

An AI-powered career preparation platform that helps job seekers evaluate their readiness for a role by analyzing resumes against job descriptions.

Career Insights leverages Generative AI to identify skill gaps, generate technical and behavioral interview questions, create personalized preparation roadmaps, and provide downloadable AI-generated resume.

---

## 🌐 Live Demo

Frontend: https://your-frontend-link.netlify.app

Backend API: https://your-backend-link.onrender.com

---

## ✨ Features

### Resume Analysis
- Upload Resume (PDF)
- Resume Parsing
- Resume & Job Description Matching
- AI-Powered Match Score

### Interview Preparation
- Technical Interview Questions
- Behavioral Interview Questions
- Question Intent Analysis
- Suggested Answers

### Career Insights
- Skill Gap Detection
- Personalized Learning Roadmap


### Reports
- AI Generated Career Report
- Downloadable PDF Report
- Interview History Tracking

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### UI/UX
- Responsive Design
- Modern Dashboard Layout
- Mobile & Tablet Support

---

## 🛠 Tech Stack

### Frontend

- React
- React Router
- SCSS
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt
- Cookies

### AI Integration

- Google Gemini API

### File Processing

- Multer
- PDF Parse
- PDF Generation (puppeteer)

### Tools

- Git
- GitHub
- Postman

---

## 📂 Project Structure

```bash
CareerInsights/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   └── interview/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── config/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/PunitSharma04/CareerInsights.git
```

### Backend Setup

```bash
cd Backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside Backend.

```env
PORT=3000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

---



## 🎯 Future Improvements

- Email Job Alerts
- Advanced Analytics Dashboard

---

## 👨‍💻 Author

Punit Sharma

GitHub: https://github.com/punitsharma04

LinkedIn: https://linkedin.com/in/punit-sharma-ps22ecb0b04

---