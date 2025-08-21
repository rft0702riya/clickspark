# Contact Form Setup Instructions

## Overview
This setup connects the frontend contact form with the backend database to store contact submissions.

## Database Setup

### 1. Create the Contacts Table
Run the setup script to create the contacts table:

```bash
cd Backend
node setup-contacts.js
```

Or manually execute the SQL:

```sql
USE click;

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName  VARCHAR(100) NOT NULL,
  email     VARCHAR(150) NOT NULL,
  phone     VARCHAR(30)  NOT NULL,
  country   VARCHAR(50)  NOT NULL,
  company   VARCHAR(150) NOT NULL,
  website   VARCHAR(200) NOT NULL,
  revenue   VARCHAR(100) NOT NULL,
  message   TEXT NOT NULL,
  agree     TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Backend Setup

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Environment Variables
Make sure your `.env` file has the correct database credentials:

```env
DB_HOST=localhost
DB_USER=riya0701
DB_PASSWORD=riya1234
DB_NAME=click
```

### 3. Start the Backend Server
```bash
npm start
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Start the Frontend
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Public Endpoints
- `POST /api/contact/submit` - Submit contact form

### Protected Endpoints (Require Authentication)
- `GET /api/contact/all` - Get all contacts
- `GET /api/contact/:id` - Get contact by ID
- `DELETE /api/contact/:id` - Delete contact

## Features

### Frontend Features
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Responsive design

### Backend Features
- ✅ Input validation
- ✅ Email format validation
- ✅ Database storage
- ✅ Error handling
- ✅ CORS configuration

## Testing the Setup

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173/contact`
3. Fill out the contact form
4. Submit the form
5. Check the database to verify the data was stored

## Database Queries

### View all contacts
```sql
SELECT * FROM contacts ORDER BY created_at DESC;
```

### View recent contacts
```sql
SELECT * FROM contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);
```

### Count total contacts
```sql
SELECT COUNT(*) as total_contacts FROM contacts;
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `.env` file credentials
   - Ensure MySQL is running
   - Verify database exists

2. **CORS Error**
   - Backend is configured to allow frontend at `http://localhost:5173`
   - Check if both servers are running on correct ports

3. **Form Submission Error**
   - Check browser console for errors
   - Verify backend server is running
   - Check network tab for API calls

### Debug Commands

```bash
# Check if contacts table exists
mysql -u riya0701 -p click -e "SHOW TABLES LIKE 'contacts';"

# View table structure
mysql -u riya0701 -p click -e "DESCRIBE contacts;"

# Test database connection
node Backend/setup-contacts.js
```
