MelodyVerse App

This project is a full-stack web application for user authentication, built using React.js for the frontend and Node.js with Express for the backend. It features secure login and signup functionality using JWT (JSON Web Tokens) and follows best practices for web development.

Table of Contents

Project Overview
Features
Technology Stack
Installation
Usage
API Endpoints
Best Practices Implemented
Bonus Features
Future Improvements

Project Overview

The MelodyVerse Authentication System allows users to register and log in to a fictional music streaming service called "MelodyVerse." The application demonstrates user authentication using JWTs and includes features such as form validation, responsive design, and secure password handling.

Features

User Registration (Signup): Allows users to create an account with a username, email, and password.
User Login: Authenticates users with their username or email and password, returning a JWT for session management.
JWT Authentication: Secures routes and ensures that only authenticated users can access certain parts of the application.
Password Hashing: Securely stores passwords using bcrypt.
Responsive Design: Works seamlessly on desktop, tablet, and mobile devices.
Remember Me: Option to remember users across sessions using local storage or cookies.
Forgot Password: Basic link for password recovery.
Form Validation: Ensures valid input for user registration and login.

Technology Stack

Frontend:

React.js
Tailwind CSS for styling
React Router for navigation
React Hooks and Context API for state management

Backend:

Node.js
Express.js
MongoDB
JSON Web Token (JWT) for authentication
bcrypt for password hashing

Installation

Backend:

cd connectverse-backend
npm i
npm run start

Frontend:

cd melodyverse-frontend
cd melodyverse
npm i
npm run start

The backend server runs on port 4000.
The frontend server runs on port 3000.

Usage

Signup: Register a new user by providing a username, email, and password.
Login: Authenticate with your credentials to receive a JWT token.
Remember Me: Optionally, use the "Remember Me" checkbox to stay logged in across sessions.
Forgot Password: Click the "Forgot Password" link to navigate to the password recovery page (not fully implemented).

API Endpoints

POST /signup

Registers a new user.

Request Body:

username: String (required)
email: String (required)
password: String (required)

Response:

Success: { message: "User registered successfully", token: <JWT> }
Error: { error: "User already exists" }

POST /login

Authenticates an existing user.

Request Body:

username Or Email: String (required)
password: String (required)

Response:
Success: { token: <JWT> }
Error: { error: "Invalid credentials" }

Best Practices Implemented

Input Validation & Sanitization: All inputs are validated and sanitized to prevent vulnerabilities.
Password Security: Passwords are hashed using bcrypt before storing in the database.
Error Handling: Proper error handling is implemented with informative error messages.
Environment Variables: Sensitive information is stored in environment variables.

Bonus Features

Added rate limiting to protect against brute force attacks.
Used middleware for authentication and authorization.
Added password visibility toggle.
Implemented robust token refresh mechanisms.

Future Improvements

Password Reset Functionality: Implement full password reset and email recovery.
Email Verification: Add email verification during signup.
