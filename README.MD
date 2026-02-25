# HRMS Lite

A lightweight Human Resource Management System built with the MERN stack.

## Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Frontend   | React + Vite + Tailwind CSS   |
| Backend    | Node.js + Express.js          |
| Database   | MongoDB + Mongoose            |
| Deployment | Vercel (client) + Render (server) |

## Project Structure

```
hrms-lite/
├── client/     # Vite React frontend
└── server/     # Express backend
```

## Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hrms-lite.git
cd hrms-lite
```

### 2. Setup the Server

```bash
cd server
npm install
cp .env.example .env       # fill in your MONGO_URI and PORT
npm start
```

### 3. Setup the Client

```bash
cd client
npm install
cp .env.example .env       # fill in your VITE_API_URL
npm run dev
```

### 4. Open in browser

```
Frontend → http://localhost:5173
Backend  → http://localhost:3000
```

## Environment Variables

### Server (`server/.env`)

| Variable    | Description                        |
|-------------|------------------------------------|
| `PORT`      | Port the server runs on (default 5000) |
| `MONGO_URI` | MongoDB connection string          |
| `NODE_ENV`  | `development` or `production`      |

### Client (`client/.env`)

| Variable             | Description                   |
|----------------------|-------------------------------|
| `VITE_API_BASE_URL`  | Base URL of the backend API   |

## Features

- Employee management — add, view, delete employees
- Attendance tracking — mark and view daily attendance per employee
- Dashboard — summary stats and recently added employees

## Assumptions & Limitations

- Single admin user — no authentication required
- No leave management or payroll features


## Live Demo

- Frontend: `https://hrms-seven-dusky.vercel.app`
- Backend API: `https://hrms-7got.onrender.com/health`
- Live Link : https://hrms-seven-dusky.vercel.app/
