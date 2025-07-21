@echo off
echo ========================================
echo    Courrier Management System
echo    Starting All Components...
echo ========================================
echo.

echo Checking prerequisites...
where java >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    pause
    exit /b 1
)

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

where ng >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Angular CLI is not installed. Please run: npm install -g @angular/cli
    pause
    exit /b 1
)

echo Prerequisites check passed!
echo.

:: Start Backend (Spring Boot)
echo [1/3] Starting Backend (Spring Boot) on port 9090...
echo.
cd backend
start "Backend - Spring Boot" cmd /k "echo Starting Spring Boot application... && mvn spring-boot:run"
cd ..

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Start AI Model (FastAPI)
echo [2/3] Starting AI Model (FastAPI) on port 8000...
echo.
cd model
if not exist "venv\Scripts\activate.bat" (
    echo ERROR: Virtual environment not found. Please create it first:
    echo python -m venv venv
    echo venv\Scripts\activate
    echo pip install -r requirements.txt
    pause
    exit /b 1
)

start "AI Model - FastAPI" cmd /k "echo Activating virtual environment and starting FastAPI... && venv\Scripts\activate && cd app && python api.py"
cd ..

:: Wait a moment for AI model to start
timeout /t 3 /nobreak >nul

:: Start Frontend (Angular)
echo [3/3] Starting Frontend (Angular) on port 4200...
echo.
cd frontend
start "Frontend - Angular" cmd /k "echo Starting Angular development server... && ng serve"
cd ..

echo.
echo ========================================
echo    All Components Started!
echo ========================================
echo.
echo Services running on:
echo - Backend (Spring Boot): http://localhost:9090
echo - AI Model (FastAPI):    http://localhost:8000
echo - Frontend (Angular):    http://localhost:4200
echo.
echo API Documentation:
echo - Backend API:           http://localhost:9090/api/courriers
echo - AI Model API:          http://localhost:8000/docs
echo.
echo Press any key to open the application in your browser...
pause >nul

:: Open the application in default browser
start http://localhost:4200

echo.
echo Application is now running!
echo Close the command windows to stop the services.
echo.
pause 