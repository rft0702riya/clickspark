# Authentication System Setup

This document explains how to set up and use the authentication system for the ClickSpark frontend.

## Features

- **User Registration**: Create new accounts with name, email, and password
- **User Login**: Sign in with email and password
- **User Profile**: View and manage user information
- **Protected Routes**: Secure routes that require authentication
- **Logout**: Sign out and clear session data

## Backend Requirements

### Database Setup

1. Create a MySQL database
2. Run the SQL script in `Backend/setup-db.sql` to create the users table:

```sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Environment Variables

Create a `.env` file in the Backend directory:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
DB_PORT=3306
```

### Backend Dependencies

Make sure these packages are installed in the Backend:

```bash
npm install express cors bcrypt mysql2 dotenv body-parser
```

## Frontend Setup

### Dependencies

All required dependencies are already included in `package.json`:

- `react-router-dom` - For routing
- `framer-motion` - For animations
- `lucide-react` - For icons

### Running the Application

1. Start the backend server:
```bash
cd Backend
npm start
```

2. Start the frontend development server:
```bash
cd Frontend
npm run dev
```

## Authentication Flow

### Registration
1. User navigates to `/register`
2. Fills out the registration form (name, email, password, confirm password)
3. Form validates input and submits to backend
4. Backend creates user account and returns success
5. User is automatically logged in and redirected to home page

### Login
1. User navigates to `/login`
2. Enters email and password
3. Form validates input and submits to backend
4. Backend verifies credentials and returns user data
5. User is logged in and redirected to home page

### Protected Routes
- `/profile` - Requires authentication
- If user is not logged in, they are redirected to `/login`
- After successful login, they are redirected back to the original page

### Logout
1. User clicks logout button in navbar
2. Session data is cleared from localStorage
3. User is redirected to home page

## Components

### AuthContext (`src/context/AuthContext.jsx`)
- Manages authentication state across the application
- Provides login, register, logout functions
- Handles token and user data storage

### Login (`src/components/auth/Login.jsx`)
- Login form with email and password fields
- Form validation and error handling
- Password visibility toggle

### Register (`src/components/auth/Register.jsx`)
- Registration form with name, email, password, and confirm password
- Form validation and error handling
- Password requirements display

### UserProfile (`src/components/auth/UserProfile.jsx`)
- Displays user information
- Provides logout functionality
- Protected route component

### ProtectedRoute (`src/components/auth/ProtectedRoute.jsx`)
- Wrapper component for protected routes
- Redirects unauthenticated users to login
- Shows loading state while checking authentication

## API Endpoints

### POST `/api/auth/register`
- **Body**: `{ name, email, password }`
- **Response**: `{ message: "User registered successfully" }`

### POST `/api/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ message: "Login successful", user: {...}, token: "..." }`

## Styling

The authentication components use:
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Consistent color scheme with the main application (yellow theme)

## Security Features

- Password hashing using bcrypt
- Form validation on both frontend and backend
- Protected routes with automatic redirects
- Secure token storage in localStorage
- Input sanitization and validation

## Testing

To test the authentication system:

1. Start both backend and frontend servers
2. Navigate to `/register` to create a new account
3. Try logging out and logging back in
4. Test protected routes by navigating to `/profile`
5. Test form validation by submitting invalid data

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend has CORS enabled
2. **Database Connection**: Check your database credentials and connection
3. **Port Conflicts**: Ensure backend is running on port 5000
4. **Missing Dependencies**: Run `npm install` in both directories

### Debug Mode

To enable debug logging, add this to your backend:

```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```
