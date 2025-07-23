@echo off
echo Starting Lock Pros Website Server...
echo.
echo Choose an option:
echo 1. Python (if you have Python installed)
echo 2. Node.js (if you have Node.js installed)
echo 3. PHP (if you have PHP installed)
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Starting Python server on http://localhost:8000
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo Starting Node.js server on http://localhost:8000
    npx http-server -p 8000
) else if "%choice%"=="3" (
    echo Starting PHP server on http://localhost:8000
    php -S localhost:8000
) else (
    echo Invalid choice. Please run the script again.
    pause
)

pause
