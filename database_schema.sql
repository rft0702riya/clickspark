-- =====================================================
-- ClickSpark Database Schema
-- MySQL Database for Project Management Platform
-- =====================================================
DROP TRIGGER IF EXISTS update_project_progress;
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS click;
USE click;

-- =====================================================
-- 1. USERS TABLE (Core Authentication)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    bio TEXT,
    role ENUM('admin', 'manager', 'developer', 'client', 'viewer') DEFAULT 'developer',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_role (role),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- 2. PROJECTS TABLE (Core Project Management)
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    client_name VARCHAR(255),
    client_email VARCHAR(255),
    client_phone VARCHAR(20),
    budget DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'USD',
    start_date DATE,
    end_date DATE,
    status ENUM('planning', 'in_progress', 'review', 'completed', 'on_hold', 'cancelled') DEFAULT 'planning',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    created_by INT NOT NULL,
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_created_by (created_by),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_start_date (start_date),
    INDEX idx_end_date (end_date)
);

-- =====================================================
-- 3. PROJECT_MEMBERS TABLE (Many-to-Many Relationship)
-- =====================================================
CREATE TABLE IF NOT EXISTS project_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('owner', 'manager', 'developer', 'reviewer', 'viewer') DEFAULT 'developer',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_project_user (project_id, user_id),
    INDEX idx_project_id (project_id),
    INDEX idx_user_id (user_id),
    INDEX idx_role (role)
);

-- =====================================================
-- 4. TASKS TABLE (Task Management)
-- =====================================================
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    project_id INT NOT NULL,
    assigned_to INT,
    created_by INT NOT NULL,
    status ENUM('todo', 'in_progress', 'review', 'testing', 'completed', 'blocked') DEFAULT 'todo',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    estimated_hours DECIMAL(5,2),
    actual_hours DECIMAL(5,2),
    due_date DATE,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    
    INDEX idx_project_id (project_id),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_due_date (due_date),
    INDEX idx_created_by (created_by)
);

-- =====================================================
-- 5. COMMENTS TABLE (Task Comments)
-- =====================================================
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    parent_comment_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    
    INDEX idx_task_id (task_id),
    INDEX idx_user_id (user_id),
    INDEX idx_parent_comment_id (parent_comment_id),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- 6. TIME_LOGS TABLE (Time Tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS time_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NULL,
    duration_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_task_id (task_id),
    INDEX idx_user_id (user_id),
    INDEX idx_start_time (start_time),
    INDEX idx_end_time (end_time)
);

-- =====================================================
-- 7. ATTACHMENTS TABLE (File Management)
-- =====================================================
CREATE TABLE IF NOT EXISTS attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    task_id INT,
    project_id INT,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_task_id (task_id),
    INDEX idx_project_id (project_id),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- 8. NOTIFICATIONS TABLE (System Notifications)
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error', 'task_assigned', 'task_completed', 'project_update') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    related_task_id INT,
    related_project_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (related_project_id) REFERENCES projects(id) ON DELETE CASCADE,
    
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- 9. PROJECT_INVITATIONS TABLE (Invitation Management)
-- =====================================================
CREATE TABLE IF NOT EXISTS project_invitations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('manager', 'developer', 'reviewer', 'viewer') DEFAULT 'developer',
    invited_by INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    accepted_at TIMESTAMP NULL,
    status ENUM('pending', 'accepted', 'expired', 'declined') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_project_id (project_id),
    INDEX idx_email (email),
    INDEX idx_token (token),
    INDEX idx_status (status),
    INDEX idx_expires_at (expires_at)
);

-- =====================================================
-- 10. AUDIT_LOGS TABLE (System Audit Trail)
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_table_name (table_name),
    INDEX idx_record_id (record_id),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- 11. SETTINGS TABLE (Application Settings)
-- =====================================================
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger to update project progress when tasks are updated
DELIMITER //
CREATE TRIGGER update_project_progress
AFTER UPDATE ON tasks
FOR EACH ROW
BEGIN
    DECLARE total_tasks INT;
    DECLARE completed_tasks INT;
    DECLARE new_progress INT;
    
    -- Count total tasks for the project
    SELECT COUNT(*) INTO total_tasks
    FROM tasks
    WHERE project_id = NEW.project_id;
    
    -- Count completed tasks for the project
    SELECT COUNT(*) INTO completed_tasks
    FROM tasks
    WHERE project_id = NEW.project_id AND status = 'completed';
    
    -- Calculate new progress percentage
    IF total_tasks > 0 THEN
        SET new_progress = ROUND((completed_tasks / total_tasks) * 100);
    ELSE
        SET new_progress = 0;
    END IF;
    
    -- Update project progress
    UPDATE projects
    SET progress_percentage = new_progress,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.project_id;
END//
DELIMITER ;

-- Trigger to create audit log for user updates
DELIMITER //
CREATE TRIGGER audit_user_updates
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values)
    VALUES (
        NEW.id,
        'UPDATE',
        'users',
        NEW.id,
        JSON_OBJECT(
            'name', OLD.name,
            'email', OLD.email,
            'role', OLD.role,
            'status', OLD.status
        ),
        JSON_OBJECT(
            'name', NEW.name,
            'email', NEW.email,
            'role', NEW.role,
            'status', NEW.status
        )
    );
END//
DELIMITER ;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

-- Procedure to get project statistics
DELIMITER //
CREATE PROCEDURE GetProjectStats(IN project_id_param INT)
BEGIN
    SELECT 
        p.id,
        p.name,
        p.status,
        p.progress_percentage,
        COUNT(DISTINCT t.id) as total_tasks,
        COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completed_tasks,
        COUNT(DISTINCT pm.user_id) as team_members,
        SUM(t.estimated_hours) as total_estimated_hours,
        SUM(t.actual_hours) as total_actual_hours
    FROM projects p
    LEFT JOIN tasks t ON p.id = t.project_id
    LEFT JOIN project_members pm ON p.id = pm.project_id AND pm.is_active = TRUE
    WHERE p.id = project_id_param
    GROUP BY p.id, p.name, p.status, p.progress_percentage;
END//
DELIMITER ;

-- Procedure to get user dashboard data
DELIMITER //
CREATE PROCEDURE GetUserDashboard(IN user_id_param INT)
BEGIN
    -- User's projects
    SELECT 
        p.id,
        p.name,
        p.status,
        p.progress_percentage,
        p.priority,
        p.due_date
    FROM projects p
    INNER JOIN project_members pm ON p.id = pm.project_id
    WHERE pm.user_id = user_id_param AND pm.is_active = TRUE
    ORDER BY p.updated_at DESC
    LIMIT 10;
    
    -- User's tasks
    SELECT 
        t.id,
        t.title,
        t.status,
        t.priority,
        t.due_date,
        p.name as project_name
    FROM tasks t
    INNER JOIN projects p ON t.project_id = p.id
    WHERE t.assigned_to = user_id_param
    ORDER BY t.due_date ASC, t.priority DESC
    LIMIT 15;
    
    -- Recent notifications
    SELECT 
        id,
        title,
        message,
        type,
        is_read,
        created_at
    FROM notifications
    WHERE user_id = user_id_param
    ORDER BY created_at DESC
    LIMIT 10;
END//
DELIMITER ;

-- =====================================================
-- VIEWS
-- =====================================================

-- View for project overview
CREATE VIEW project_overview AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.status,
    p.priority,
    p.progress_percentage,
    p.start_date,
    p.end_date,
    p.budget,
    p.currency,
    u.name as created_by_name,
    u2.name as assigned_to_name,
    COUNT(DISTINCT t.id) as total_tasks,
    COUNT(DISTINCT CASE WHEN t.status = 'completed' THEN t.id END) as completed_tasks,
    COUNT(DISTINCT pm.user_id) as team_size
FROM projects p
LEFT JOIN users u ON p.created_by = u.id
LEFT JOIN users u2 ON p.assigned_to = u2.id
LEFT JOIN tasks t ON p.id = t.project_id
LEFT JOIN project_members pm ON p.id = pm.project_id AND pm.is_active = TRUE
GROUP BY p.id, p.name, p.description, p.status, p.priority, p.progress_percentage, 
         p.start_date, p.end_date, p.budget, p.currency, u.name, u2.name;

-- View for task details with project info
CREATE VIEW task_details AS
SELECT 
    t.id,
    t.title,
    t.description,
    t.status,
    t.priority,
    t.estimated_hours,
    t.actual_hours,
    t.due_date,
    t.completed_at,
    t.created_at,
    p.id as project_id,
    p.name as project_name,
    u1.name as assigned_to_name,
    u2.name as created_by_name,
    COUNT(c.id) as comment_count
FROM tasks t
INNER JOIN projects p ON t.project_id = p.id
LEFT JOIN users u1 ON t.assigned_to = u1.id
LEFT JOIN users u2 ON t.created_by = u2.id
LEFT JOIN comments c ON t.id = c.task_id
GROUP BY t.id, t.title, t.description, t.status, t.priority, t.estimated_hours, 
         t.actual_hours, t.due_date, t.completed_at, t.created_at, p.id, p.name, 
         u1.name, u2.name;

-- =====================================================
-- INITIAL DATA
-- =====================================================

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('app_name', 'ClickSpark', 'string', 'Application name', TRUE),
('app_version', '1.0.0', 'string', 'Application version', TRUE),
('max_file_size', '10485760', 'number', 'Maximum file upload size in bytes (10MB)', TRUE),
('allowed_file_types', '["jpg","jpeg","png","gif","pdf","doc","docx","xls","xlsx","txt","zip","rar"]', 'json', 'Allowed file types for upload', TRUE),
('email_notifications', 'true', 'boolean', 'Enable email notifications', TRUE),
('session_timeout', '3600', 'number', 'Session timeout in seconds', FALSE),
('maintenance_mode', 'false', 'boolean', 'Maintenance mode flag', TRUE);

-- Insert admin user (password: admin123 - change this in production!)
INSERT INTO users (name, email, password, role, email_verified, email_verified_at) VALUES
('Admin User', 'admin@clickspark.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', TRUE, CURRENT_TIMESTAMP);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Additional composite indexes for better query performance
CREATE INDEX idx_tasks_project_status ON tasks(project_id, status);
CREATE INDEX idx_tasks_assigned_status ON tasks(assigned_to, status);
CREATE INDEX idx_projects_status_priority ON projects(status, priority);
CREATE INDEX idx_time_logs_task_user ON time_logs(task_id, user_id);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX idx_audit_logs_user_action ON audit_logs(user_id, action);

-- =====================================================
-- COMMENTS AND DOCUMENTATION
-- =====================================================

/*
Database Schema Documentation:

1. USERS: Core user management with authentication and profile data
2. PROJECTS: Main project information and metadata
3. PROJECT_MEMBERS: Many-to-many relationship between users and projects
4. TASKS: Individual tasks within projects
5. COMMENTS: Comments on tasks with support for nested replies
6. TIME_LOGS: Time tracking for tasks
7. ATTACHMENTS: File management for tasks and projects
8. NOTIFICATIONS: System notifications for users
9. PROJECT_INVITATIONS: Invitation system for project collaboration
10. AUDIT_LOGS: System audit trail for security and compliance
11. SETTINGS: Application configuration settings

Key Features:
- Full user authentication and authorization
- Project management with team collaboration
- Task management with time tracking
- File attachment system
- Notification system
- Audit logging for security
- Invitation system for project access
- Comprehensive indexing for performance
- Triggers for automatic updates
- Stored procedures for common operations
- Views for simplified data access

Security Features:
- Password hashing (bcrypt)
- JWT token authentication
- Role-based access control
- Audit logging
- Email verification system
- Session management

Performance Optimizations:
- Strategic indexing on frequently queried columns
- Composite indexes for complex queries
- Efficient foreign key relationships
- Optimized data types and constraints
*/
