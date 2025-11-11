# Banking System - Dockerized Full-Stack Application

A complete banking system built with React, Node.js, and MySQL, fully containerized using Docker for easy deployment and consistent development environments across different machines.

## Description

This project demonstrates a production-ready, three-tier banking system architecture deployed entirely with Docker containers. The system consists of a React frontend, Node.js API backend, and MySQL database, all orchestrated through Docker Compose and communicating over a dedicated Docker network (`banking_network`). 

The primary goal of this implementation is to showcase Docker's capabilities in:
* **Environment Consistency** - Eliminating "it works on my machine" problems
* **Easy Setup** - One-command deployment without manual dependency installation
* **Isolation** - Each service runs independently in its own container
* **Scalability** - Container-based architecture ready for cloud deployment
* **Portability** - Run the entire stack on any machine with Docker installed

The application provides a user-friendly interface for managing banking operations including customer management, account handling, and transaction processing.

## Getting Started

### Dependencies

* Docker Desktop (Windows/Mac) or Docker Engine (Linux)
* Docker Compose (usually bundled with Docker Desktop)
* Modern web browser (Chrome, Firefox, Safari, or Edge)
* Minimum 4GB RAM available for Docker
* Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)

### Installing

* Navigate to the `DB` directory and create a `.env` file
* Add MySQL configuration with strong password
* Navigate to the `API` directory and create a `.env` file
* Add database connection details (password must match DB configuration)

**Database Environment File (../DB/.env):**
```
MYSQL_ROOT_PASSWORD=yourStrongPassHere
MYSQL_DATABASE=banking_system
```

**API Environment File (../API/.env):**
```
DB_ROOT_PASSWORD=yourStrongPassHere
DB_USER=root
DB_NAME=banking_system
DB_HOST=db_container_test
```

### Executing program

* Start services in order: Database → API → Frontend
* Each service must complete startup before proceeding to the next

**Step 1: Start Database**
```
cd ../DB
docker network create banking_network 2>$null
docker compose up -d --build
```

**Step 2: Start API**
```
cd ../API
docker compose up -d --build
```

**Step 3: Start Frontend**
```
cd ../frontend
docker compose up -d --build
```

**Step 4: Access Application**
* Open browser and navigate to http://localhost:5173
* Check `frontend/docker-compose.yml` for exact port mapping

## Help

Any advice for common problems or issues.

**View logs for debugging:**
```
docker logs frontend_container_test --tail=100 --follow
docker logs api_container_test --tail=100 --follow
docker logs db_container_test --tail=100 --follow
```

**Network issues:**
```
docker network create banking_network
docker network inspect banking_network
```

**Port conflicts:**
```
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```
