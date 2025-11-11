🏦 Banking System Frontend
A modern React application for the Banking System, designed to run in a containerized environment with seamless integration to the backend API and database services.


✅ Prerequisites
Before you begin, ensure you have the following installed on your system:

Docker Desktop (Windows/Mac) or Docker Engine (Linux)
Docker Compose (usually bundled with Docker Desktop)


Note: This application requires Docker to run the complete stack (Database, API, and Frontend).


🏗️ Architecture Overview
The Banking System consists of three interconnected services:
┌─────────────────┐
│   Frontend      │  ← React Application (Port 3000/80)
│   (This App)    │
└────────┬────────┘
         │
         ↓ http://api_container_test:5000
┌─────────────────┐
│   API Service   │  ← Backend API (Port 5000)
└────────┬────────┘
         │
         ↓ db_container_test:3306
┌─────────────────┐
│   Database      │  ← MySQL 8.0 (Port 3307)
└─────────────────┘
All services communicate over the banking_network Docker network.

⚙️ Environment Configuration
Step 1: Configure Database Environment
Navigate to the DB directory and create a .env file:
bash# ../DB/.env

# MySQL Configuration
MYSQL_ROOT_PASSWORD=yourStrongPassHere
MYSQL_DATABASE=banking_system

🔒 Security Note: Choose a strong password and keep it secure!


Step 2: Configure API Environment
Navigate to the API directory and create a .env file:
bash# ../API/.env

# Database Connection
DB_ROOT_PASSWORD=yourStrongPassHere  # Must match DB/.env password!
DB_USER=root
DB_NAME=banking_system
DB_HOST=db_container_test            # Docker service name (crucial!)

⚠️ Important: The DB_ROOT_PASSWORD must match the password set in DB/.env


🚀 Installation & Deployment
Follow these steps in order to start the complete Banking System:
Step 1: Start the Database Service
powershellcd ../DB

# Create the shared Docker network (ignore if already exists)
docker network create banking_network 2>$null

# Build and start the database container
docker compose up -d --build
Expected Output:
✔ Container db_container_test  Started

Step 2: Start the API Service
powershellcd ../API

# Build and start the API container
docker compose up -d --build
Expected Output:
✔ Container api_container_test  Started

Step 3: Start the Frontend Service
powershellcd ../frontend

# Build and start the frontend container
docker compose up -d --build
Expected Output:
✔ Container frontend_container_test  Started

🌐 Accessing the Application
Once all services are running, access the Banking System through your web browser:

Default URL: http://localhost:3000
Alternative: http://localhost:80


💡 Tip: Check your frontend/docker-compose.yml file to confirm the exact port mapping.


🛠️ Useful Commands
View Service Logs
Monitor the logs of any service to debug issues or check status:
powershell# Frontend logs (last 100 lines)
docker logs frontend_container_test --tail=100 --follow

# API logs (last 100 lines)
docker logs api_container_test --tail=100 --follow

# Database logs (last 100 lines)
docker logs db_container_test --tail=100 --follow

Check Running Containers
powershell# List all running containers
docker ps

# List all containers (including stopped)
docker ps -a

Stop All Services
powershell# Stop and remove containers (from each directory)
cd ../DB && docker compose down
cd ../API && docker compose down
cd ../frontend && docker compose down

Restart a Specific Service
powershell# Restart frontend
docker restart frontend_container_test

# Restart API
docker restart api_container_test

# Restart database
docker restart db_container_test

Clean Up Everything
powershell# Remove all containers, networks, and volumes
docker compose down -v

# Remove the shared network
docker network rm banking_network

🔧 Troubleshooting
Problem: "Network not found"
Solution: Create the network manually:
powershelldocker network create banking_network

Problem: "Port already in use"
Solution: Check if another service is using the port:
powershell# Windows
netstat -ano | findstr :3000

# Kill the process using the port (replace PID)
taskkill /PID <PID> /F

Problem: Frontend can't connect to API
Solution: Verify all services are running and on the same network:
powershelldocker network inspect banking_network
All three containers should appear in the output.

Problem: Database connection refused
Solution: Check if the database is ready:
powershelldocker exec -it db_container_test mysql -uroot -p<password> -e "SELECT 1;"