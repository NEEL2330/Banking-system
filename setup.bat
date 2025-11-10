@echo off
echo Banking System - Local Setup Script
echo ==================================

echo.
echo 1. Setting up Python virtual environment...
cd API
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt

echo.
echo 2. Installing frontend dependencies...
cd ..\frontend
npm install

echo.
echo 3. Setup complete!
echo.
echo To run the application:
echo 1. Start MySQL service
echo 2. Run setup.sql in MySQL to create database
echo 3. Start API: cd API && venv\Scripts\activate && python handler\app.py
echo 4. Start Frontend: cd frontend && npm run dev
echo.
pause
