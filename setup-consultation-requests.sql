USE click;

-- Drop table if exists (for development)
DROP TABLE IF EXISTS consultation_requests;

-- Create consultation_requests table
CREATE TABLE consultation_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company VARCHAR(255),
  message TEXT,
  preferred_datetime DATETIME NOT NULL,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_email ON consultation_requests(email);
CREATE INDEX idx_preferred_datetime ON consultation_requests(preferred_datetime);
CREATE INDEX idx_status ON consultation_requests(status);
CREATE INDEX idx_created_at ON consultation_requests(created_at);

-- Optional: Add foreign key if you want to link to users table
-- ALTER TABLE consultation_requests ADD COLUMN user_id INT;
-- ALTER TABLE consultation_requests ADD FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;
