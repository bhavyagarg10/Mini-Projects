**Notes App API - Project Guide**

---

### 1. Project Overview

This Notes App API is built using **Node.js**, **Express**, and **MongoDB**. It supports user authentication through **JWT** (JSON Web Tokens) and provides full **CRUD operations** for managing notes.

Features:

- User registration and login
- JWT-based authentication
- Create, Read, Update, Delete notes
- Notes can be pinned, archived, and color-coded

---

### 2. Project Structure

```
notes-app-api/
|-- controllers/
|   |-- authController.js
|   |-- noteController.js
|-- middleware/
|   |-- authMiddleware.js
|-- models/
|   |-- User.js
|   |-- Note.js
|-- routes/
|   |-- authRoutes.js
|   |-- noteRoutes.js
|-- .env
|-- app.js
|-- server.js
|-- package.json
```

---

### 3. Important Terms and Concepts

**JWT (JSON Web Token)**

- A secure way to transmit user information.
- Used to authenticate requests via token passed in headers.
- Created using `jwt.sign(payload, secret, { expiresIn: '7d' })`

**Middleware**

- Functions that run before the route handlers.
- `authMiddleware` verifies JWT and attaches user info to `req.user`.

**MongoDB Models**

- Define schemas for MongoDB collections using Mongoose.
- Relationships: Note references a User via ObjectId.

---

### 4. File Roles and Responsibilities

Here’s a breakdown of what each key file/folder in the project is meant to do:

#### models/User.js
Defines the schema and logic for the User. Handles user fields like username, email, password, and password hashing before saving to the database.

#### models/Note.js
Schema for storing notes. Each note is tied to a user and includes properties like title, content, pinned, archived, and color.

#### controllers/authController.js
Manages authentication logic including registration and login. Handles JWT creation upon successful login/registration.

#### controllers/noteController.js
Manages note-related logic such as creating a note, retrieving a list of notes, updating, and deleting notes.

#### middleware/authMiddleware.js
A function that runs before protected routes. It checks if the JWT token is valid and assigns the authenticated user's data to the request object.

#### routes/authRoutes.js
Defines routes for user registration and login. Maps HTTP endpoints to controller functions.

#### routes/noteRoutes.js
Defines note routes that are protected via middleware. Includes CRUD operations for notes.

#### app.js
Initializes the express application and middleware.

#### server.js
Starts the server and connects to MongoDB.

#### .env
Contains environment-specific configuration like JWT secret and database URL.

---

### 5. Project Capabilities Recap

- Handles user authentication and session management via JWT.
- Supports full CRUD operations on notes.
- Enables note features such as pinning, archiving, and assigning colors.
- Includes middleware to protect sensitive routes.
- Follows MVC pattern for clean separation of logic.

---

### 6. Visual Diagram (Flow Overview)

```
Client (Frontend)
    |
    |---> POST /api/auth/register or /login
    |         => Auth Controller
    |         => JWT Token issued
    |
    |---> GET/POST/PUT/DELETE /api/notes (With JWT in Headers)
              => Auth Middleware validates JWT
              => Notes Controller handles note logic
```

---

### 7. Testing Instructions (Using Postman or any API client)

**1. Register a new user**
- Method: POST
- URL: http://localhost:5000/api/auth/register
- Body (JSON):
```
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**2. Login as the user**
- Method: POST
- URL: http://localhost:5000/api/auth/login
- Body (JSON):
```
{
  "email": "test@example.com",
  "password": "password123"
}
```
- Response: JWT Token

**3. Create a Note**
- Method: POST
- URL: http://localhost:5000/api/notes
- Headers:
  - Authorization: Bearer <JWT_TOKEN>
  - Content-Type: application/json
- Body (JSON):
```
{
  "title": "First Note",
  "content": "This is a test note.",
  "pinned": false,
  "archived": false,
  "color": "#ffcc00"
}
```

**4. Fetch all Notes**
- Method: GET
- URL: http://localhost:5000/api/notes
- Headers:
  - Authorization: Bearer <JWT_TOKEN>

**5. Update/Delete Note**
- Use PUT/DELETE methods on URL: http://localhost:5000/api/notes/:id
- Provide Authorization header with JWT token
-in put give Content-Type: application/json in headers

---
