#!/bin/bash

# Courrier Management System - Startup Script (Linux/macOS)
# This script starts all three components of the application

echo "========================================"
echo "   Courrier Management System"
echo "   Starting All Components..."
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Check Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo -e "${GREEN}✓ Java found: $JAVA_VERSION${NC}"
else
    echo -e "${RED}✗ ERROR: Java is not installed or not in PATH${NC}"
    read -p "Press Enter to exit"
    exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js found: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ ERROR: Node.js is not installed or not in PATH${NC}"
    read -p "Press Enter to exit"
    exit 1
fi

# Check Angular CLI
if command -v ng &> /dev/null; then
    NG_VERSION=$(ng version --json | grep -o '"Angular":"[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}✓ Angular CLI found: $NG_VERSION${NC}"
else
    echo -e "${RED}✗ ERROR: Angular CLI is not installed. Please run: npm install -g @angular/cli${NC}"
    read -p "Press Enter to exit"
    exit 1
fi

echo -e "${GREEN}Prerequisites check passed!${NC}"
echo ""

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${RED}✗ WARNING: Port $port is already in use!${NC}"
        echo "Please stop any services using port $port and try again."
        read -p "Press Enter to exit"
        exit 1
    fi
}

# Check port availability
echo -e "${YELLOW}Checking port availability...${NC}"
check_port 9090
check_port 8000
check_port 4200
echo -e "${GREEN}✓ All ports are available!${NC}"
echo ""

# Start Backend (Spring Boot)
echo -e "${BLUE}[1/3] Starting Backend (Spring Boot) on port 9090...${NC}"
echo ""
cd backend
gnome-terminal --title="Backend - Spring Boot" -- bash -c "echo 'Starting Spring Boot application...'; mvn spring-boot:run; exec bash" 2>/dev/null || \
xterm -title "Backend - Spring Boot" -e "echo 'Starting Spring Boot application...'; mvn spring-boot:run; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'/backend\" && echo \"Starting Spring Boot application...\" && mvn spring-boot:run"' 2>/dev/null || \
echo "Please start backend manually: cd backend && mvn spring-boot:run"
cd ..

# Wait for backend to start
sleep 5

# Start AI Model (FastAPI)
echo -e "${BLUE}[2/3] Starting AI Model (FastAPI) on port 8000...${NC}"
echo ""
cd model

if [ ! -f "venv/bin/activate" ]; then
    echo -e "${RED}✗ ERROR: Virtual environment not found. Please create it first:${NC}"
    echo "python3 -m venv venv"
    echo "source venv/bin/activate"
    echo "pip install -r requirements.txt"
    read -p "Press Enter to exit"
    exit 1
fi

gnome-terminal --title="AI Model - FastAPI" -- bash -c "cd \"$(pwd)\" && source venv/bin/activate && cd app && echo 'Starting FastAPI...' && python api.py; exec bash" 2>/dev/null || \
xterm -title "AI Model - FastAPI" -e "cd \"$(pwd)\" && source venv/bin/activate && cd app && echo 'Starting FastAPI...' && python api.py; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'/model\" && source venv/bin/activate && cd app && echo \"Starting FastAPI...\" && python api.py"' 2>/dev/null || \
echo "Please start AI model manually: cd model && source venv/bin/activate && cd app && python api.py"
cd ..

# Wait for AI model to start
sleep 5

# Start Frontend (Angular)
echo -e "${BLUE}[3/3] Starting Frontend (Angular) on port 4200...${NC}"
echo ""
cd frontend
gnome-terminal --title="Frontend - Angular" -- bash -c "echo 'Starting Angular development server...'; ng serve; exec bash" 2>/dev/null || \
xterm -title "Frontend - Angular" -e "echo 'Starting Angular development server...'; ng serve; exec bash" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'/frontend\" && echo \"Starting Angular development server...\" && ng serve"' 2>/dev/null || \
echo "Please start frontend manually: cd frontend && ng serve"
cd ..

echo ""
echo "========================================"
echo "   All Components Started!"
echo "========================================"
echo ""
echo -e "${GREEN}Services running on:${NC}"
echo -e "${GREEN}- Backend (Spring Boot): http://localhost:9090${NC}"
echo -e "${GREEN}- AI Model (FastAPI):    http://localhost:8000${NC}"
echo -e "${GREEN}- Frontend (Angular):    http://localhost:4200${NC}"
echo ""
echo -e "${YELLOW}API Documentation:${NC}"
echo -e "${YELLOW}- Backend API:           http://localhost:9090/api/courriers${NC}"
echo -e "${YELLOW}- AI Model API:          http://localhost:8000/docs${NC}"
echo ""

# Wait for user input
read -p "Press Enter to open the application in your browser"

# Open the application in default browser
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:4200
elif command -v open &> /dev/null; then
    open http://localhost:4200
else
    echo "Please open http://localhost:4200 in your browser"
fi

echo ""
echo -e "${GREEN}Application is now running!${NC}"
echo -e "${YELLOW}Close the terminal windows to stop the services.${NC}"
echo ""
read -p "Press Enter to exit" 