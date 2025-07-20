# Courrier Management System - Startup Script (PowerShell)
# This script starts all three components of the application

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Courrier Management System" -ForegroundColor Cyan
Write-Host "   Starting All Components..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Java
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    if ($javaVersion) {
        Write-Host "✓ Java found: $javaVersion" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ ERROR: Java is not installed or not in PATH" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Check Angular CLI
try {
    $ngVersion = ng version --json | ConvertFrom-Json
    Write-Host "✓ Angular CLI found: $($ngVersion.Angular)" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Angular CLI is not installed. Please run: npm install -g @angular/cli" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Prerequisites check passed!" -ForegroundColor Green
Write-Host ""

# Function to check if port is available
function Test-Port {
    param([int]$Port)
    
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $false
    } catch {
        return $true
    }
}

# Check port availability
Write-Host "Checking port availability..." -ForegroundColor Yellow
$ports = @(9090, 8000, 4200)

foreach ($port in $ports) {
    if (-not (Test-Port $port)) {
        Write-Host "✗ WARNING: Port $port is already in use!" -ForegroundColor Red
        Write-Host "Please stop any services using port $port and try again." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host "✓ All ports are available!" -ForegroundColor Green
Write-Host ""

# Start Backend (Spring Boot)
Write-Host "[1/3] Starting Backend (Spring Boot) on port 9090..." -ForegroundColor Blue
Write-Host ""
Set-Location "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Starting Spring Boot application...' -ForegroundColor Green; mvn spring-boot:run"
Set-Location ".."

# Wait for backend to start
Start-Sleep -Seconds 5

# Start AI Model (FastAPI)
Write-Host "[2/3] Starting AI Model (FastAPI) on port 8000..." -ForegroundColor Blue
Write-Host ""
Set-Location "model"

if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "✗ ERROR: Virtual environment not found. Please create it first:" -ForegroundColor Red
    Write-Host "python -m venv venv" -ForegroundColor Yellow
    Write-Host "venv\Scripts\Activate.ps1" -ForegroundColor Yellow
    Write-Host "pip install -r requirements.txt" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Activating virtual environment and starting FastAPI...' -ForegroundColor Green; .\venv\Scripts\Activate.ps1; Set-Location app; python api.py"
Set-Location ".."

# Wait for AI model to start
Start-Sleep -Seconds 5

# Start Frontend (Angular)
Write-Host "[3/3] Starting Frontend (Angular) on port 4200..." -ForegroundColor Blue
Write-Host ""
Set-Location "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'Starting Angular development server...' -ForegroundColor Green; ng serve"
Set-Location ".."

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   All Components Started!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Services running on:" -ForegroundColor White
Write-Host "- Backend (Spring Boot): http://localhost:9090" -ForegroundColor Green
Write-Host "- AI Model (FastAPI):    http://localhost:8000" -ForegroundColor Green
Write-Host "- Frontend (Angular):    http://localhost:4200" -ForegroundColor Green
Write-Host ""
Write-Host "API Documentation:" -ForegroundColor White
Write-Host "- Backend API:           http://localhost:9090/api/courriers" -ForegroundColor Yellow
Write-Host "- AI Model API:          http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host ""

# Wait for user input
Read-Host "Press Enter to open the application in your browser"

# Open the application in default browser
Start-Process "http://localhost:4200"

Write-Host ""
Write-Host "Application is now running!" -ForegroundColor Green
Write-Host "Close the PowerShell windows to stop the services." -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to exit" 