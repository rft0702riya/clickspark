-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_email ON users(email);

-- Optional: Insert a test user (password: test123)
-- INSERT INTO users (name, email, password) VALUES ('Test User', 'test@example.com', '$2b$10$rQZ8K9mN2pL1vX3yJ6hG8eF4sA7dC0bN5mK2pL9vX3yJ6hG8eF4sA7dC0bN5');
