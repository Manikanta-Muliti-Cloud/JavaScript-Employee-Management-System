# JavaScript Employee Management System

A simple CRUD web application for DevOps practice, built with Node.js, Express, MongoDB and a browser-based frontend.

## Features
- Create, read, update and delete employee records
- REST API with basic validation and error handling
- MongoDB persistence
- Health endpoint: `GET /api/health`
- Dockerfile and Docker Compose setup

## Prerequisites
- Node.js 20 or later and npm
- MongoDB running locally, OR Docker with Docker Compose

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust `MONGODB_URI` if needed.
3. Start MongoDB locally.
4. Start the application:
   ```bash
   npm start
   ```
5. Open http://localhost:3000

## Run with Docker Compose
```bash
docker compose up --build -d
docker compose ps
docker compose logs -f app
```
Open http://localhost:3000. Stop the stack with:
```bash
docker compose down
```
To remove the database volume too (this deletes stored employee records):
```bash
docker compose down -v
```

## API endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/employees` | List employees |
| GET | `/api/employees/:id` | Get one employee |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

Example create request:
```bash
curl -X POST http://localhost:3000/api/employees \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Priya Sharma","email":"priya@example.com","department":"Engineering","role":"Software Engineer"}'
```

## Push to GitHub
Create an empty GitHub repository named `javascript-employee-management-system`, then from this project directory run:
```bash
git init
git add .
git commit -m "Initial commit: Employee Management System"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/javascript-employee-management-system.git
git push -u origin main
```
Replace `YOUR-USERNAME` with your GitHub username. Never commit your `.env` file, passwords, API keys or cloud credentials.

## DevOps practice roadmap
1. Push source code to GitHub.
2. Build and run with Docker Compose.
3. Add a Jenkins CI pipeline.
4. Add automated tests and SonarQube analysis.
5. Build and push the image to Docker Hub or Amazon ECR.
6. Provision infrastructure with Terraform.
7. Deploy to Kubernetes.
8. Add Prometheus and Grafana monitoring.

This is a learning project, not a production-hardened employee system. Add authentication, authorization, audit logging, stronger validation and secrets management before any real-world use.