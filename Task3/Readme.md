# 🚀 Portfolio Website

A modern, fully responsive **Full Stack Portfolio Website** built using the **MERN Stack** with a secure admin dashboard for managing portfolio content dynamically. The application features a clean UI, smooth animations, dark/light theme support, and RESTful APIs for seamless content management.

---

## ✨ Features

### 🌐 User Portfolio

* Responsive design for Desktop, Tablet, and Mobile
* Light & Dark Theme
* Smooth animations using Framer Motion
* Dynamic content fetched from backend APIs
* Modern UI with Bootstrap and custom CSS
* Resume download
* Contact form
* Social media integration

### 🔐 Admin Dashboard

* Secure JWT Authentication
* Single predefined admin login
* Manage portfolio content dynamically
* CRUD operations for:

  * About
  * Projects
  * Skills
  * Experience
  * Education
  * Certificates
  * Social Links
* View and delete contact messages

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Bootstrap 5
* Axios
* Framer Motion
* React Icons
* SweetAlert2

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

### Tools

* Git & GitHub
* Postman
* Vercel
* Render

---

## 📂 Project Structure

```
Portfolio/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

## 📌 Portfolio Sections

* Home
* About
* Skills
* Projects
* Experience
* Education
* Certificates
* Contact
* Footer

---

## ⚡ Admin Features

* Admin Login
* Dashboard
* Manage About
* Manage Projects
* Manage Skills
* Manage Experience
* Manage Education
* Manage Certificates
* Manage Social Links
* View Contact Messages

---

## 🔑 API Modules

* Authentication
* About
* Projects
* Skills
* Experience
* Education
* Certificates
* Social
* Contact

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Coder-0120/DevRise.git
cd task3
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔒 Authentication

The admin dashboard is protected using **JWT Authentication**.

Only authenticated users can:

* Add data
* Update data
* Delete data
* View contact messages

---

## 📱 Responsive Design

The application is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

## 🎯 Future Enhancements

* Image uploads with Cloudinary
* Blog Management
* Analytics Dashboard
* Visitor Counter
* Email Notifications
* Multi-language Support
* SEO Optimization



## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates further improvements.
