# RBAC-system
Built a Simple Role-Based Access Control (RBAC) System using Node.js and Express.js.

## Overview
This project is a simple Role-Based Access Control (RBAC) system implemented using Node.js and Express.js. It demonstrates user roles and permissions management, user authentication with JWT (JSON Web Tokens), and access control for different routes based on user roles.

## Table of Contents
- Requirements
- Setup and Installation
- API Endpoints
- Usage
- Error Handling
- Logging
- Bonus Features
- Contributing

## Requirements
- Node.js and npm
- Dependencies:
  - express: Web framework for Node.js.
  - jsonwebtoken: Library for JSON Web Tokens.
  - bcryptjs: Library for hashing passwords.
  - express-validator: Middleware for validation and sanitization.

## Setup and Installation
### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/petersawm/rbac-system-main
cd rbac-system
```
### 2. Install Dependencies
Run the following command to install the required npm packages:

```bash
npm install
```

### 3. Run the Application
Start the Node.js server:

```bash
node index.js
The server will run on port 3000 by default. You can change the port by modifying the PORT variable in index.js.
```

## API Endpoints
### 1. User Registration
- Endpoint: POST /register
- Description: Register a new user with a specified role.
Request Body:
```json
{
  "username": "string",
  "password": "string",
  "role": "Admin|User|Guest"
}
```
Validation:
- username: Required, non-empty.
- password: Required, at least 5 characters long.
- role: Required, must be one of Admin, User, or Guest.

### 2. User Login
- Endpoint: POST /login
- Description: Authenticate user and receive a JWT token.
Request Body:
```json
{
  "username": "string",
  "password": "string"
}
```

### 3. Public Route
- Endpoint: GET /public
- Description: Accessible by everyone, including guests.

### 4. User Route
- Endpoint: GET /user
- Description: Accessible only by User and Admin roles. Requires authentication.

### 5. Admin Route
- Endpoint: GET /admin
- Description: Accessible only by Admin role. Requires authentication.

### 6. Update User Role
- Endpoint: PUT /user/:username/role
- Description: Update the role of an existing user. Requires Admin authentication.
- Request Body:
```json
{
  "role": "Admin|User|Guest"
}
```

## Usage
### Authentication
- Include the JWT token in the Authorization header as Bearer <token> for routes requiring authentication.
### Example Requests
  
- Register User:

```bash
curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123", "role": "User"}'
```
- Login:

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username": "john_doe", "password": "password123"}'
```
- Access User Route:

```bash
curl -X GET http://localhost:3000/user -H "Authorization: Bearer <your-jwt-token>"
```
- Update User Role:

```bash
curl -X PUT http://localhost:3000/user/john_doe/role -H "Authorization: Bearer <your-jwt-token>" -H "Content-Type: application/json" -d '{"role": "Admin"}'
```

## Error Handling
- 401 Unauthorized: Token is missing or invalid.
- 403 Forbidden: Insufficient permissions.
- 500 Internal Server Error: General server error.

## Logging
 -  The application logs each request to the protected routes, including the user role and 
  access status.

## Bonus Features
  -  Update User Roles: Admins can update user roles using the /user/:username/role endpoint.
  -  Input Validation and Sanitization: Added validation for registration and login endpoints 
   using express-validator.

## Contributing
  Feel free to fork this repository and submit pull requests. Contributions and feedback are 
  welcome!

Note: Ensure that you replace <your-jwt-token> with your actual JWT token when testing the endpoints.

### 🌐 Connect with me

- 💼 [LinkedIn](https://www.linkedin.com/in/peter-sawm-06932b254/)
- 💻 [GitHub](https://github.com/petersawm)
- 🌍 [Facebook](https://www.facebook.com/peter.sawm2025)

---

Made with ❤️ by Peter Sawm
