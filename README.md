# Student Course Registration System 🎓

A full-stack Learning Management System (LMS) where:

- Admin can manage courses.
- Students can register, log in, view and enroll in courses.
- Admin can view enrolled students.

---

## 🛠 Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express
- **Database**: MySQL with Sequelize ORM
- **Auth**: JWT, bcrypt
- **Role Based Access**: Admin / Student

---

## 📁 Folder Structure

Student-Course-Registration/
├── backend/ # Node + Express + Sequelize
├── frontend/ # React + Vite + Axios

yaml
Copy
Edit

---

## 🚀 Setup Instructions

### 📦 Backend Setup

```bash
cd backend
npm install
npx sequelize db:create
npx sequelize db:migrate
npm start
Create .env in backend/ with:

ini
Copy
Edit
PORT=5000
DB_NAME=your_db
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
API base URL is already configured as http://localhost:5000/api

🔐 User Roles
Role	Features
Admin	Add/Edit/Delete Courses, View Enrollments
Student	Register, Login, Enroll in Courses
