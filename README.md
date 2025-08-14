# Study Point – MERN Stack Student Course Enrollment System

A full-stack web application for managing courses, student enrollments, and admin functionalities.  
Built using **React.js**, **Node.js**, **Express.js**, and **PostgreSQL/MySQL** (can switch DB).  

---

## Features
- **Authentication** (Student & Admin login)
- **Admin**
  - Add, update, delete courses with images
  - View all enrollments
- **Student**
  - Register and login
  - View available courses
  - Enroll in courses
  - View & cancel enrollments
- **Responsive UI** for mobile, tablet, and desktop

---

## Tech Stack
### Frontend
- React.js
- Bootstrap 5
- Axios
- SweetAlert2

### Backend
- Node.js
- Express.js
- Sequelize ORM
- Multer (image uploads)
- JWT Authentication
- CORS

### Database
- MySQL (local development)
- PostgreSQL (Render deployment)

---

## Folder Structure
study-point/
│
├── backend/ # Express.js API
│ ├── controllers/ # Route logic
│ ├── middleware/ # Auth & admin check
│ ├── models/ # Sequelize models
│ ├── routes/ # API routes
│ ├── uploads/ # Course images
│ └── server.js # Entry point
│
├── frontend/ # React app
│ ├── public/
│ ├── src/
│ │ ├── components/ # Navbar etc.
│ │ ├── context/ # AuthContext
│ │ ├── pages/ # Login, Dashboard, AdminPanel
│ │ ├── services/ # API configuration
│ │ └── App.js
│
└── README.md



---

## Local Development Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Anoop8954/stduy-point.git
cd stduy-point
2️⃣ Backend Setup
cd backend
npm install


Create .env file:

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=student_enrollment
DB_DIALECT=mysql

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development


Run backend:

npm start


Default runs on http://localhost:5000

3️⃣ Frontend Setup
cd ../frontend
npm install


Create .env file:

REACT_APP_API_URL=http://localhost:5000


Run frontend:

npm start


Default runs on http://localhost:3000

Deployment
Backend (Render)

Push code to GitHub

Go to Render → New Web Service

Connect repo → Set root directory to backend

Add environment variables (same as .env)

Deploy

Database (Render PostgreSQL or MySQL on Railway)

Create DB and update .env variables accordingly.

Frontend (Netlify)

Go to Netlify → New Site from Git

Set root directory to frontend

Add environment variable:

REACT_APP_API_URL=https://your-backend.onrender.com


Deploy

Common Issues

CORS Error: Ensure backend server.js has:

app.use(cors({
  origin: ["https://your-frontend.netlify.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


Image Uploads on Render: Render restarts lose local uploads — use a cloud service (Cloudinary, AWS S3).

License

MIT License


---

I can also **add screenshots** of your project and a **deployment guide section** for Netlify + Render if you want this README to look professional and ready for submission.  

