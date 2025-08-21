
# ClickSpark Database Setup Workflow

## 🚀 Quick Start Guide

### Prerequisites
- MySQL Server (8.0 or higher)
- MySQL Workbench (for GUI management)
- Node.js and npm (for backend)

### Step 1: Database Setup

#### Option A: Using MySQL Workbench (Recommended)
1. **Open MySQL Workbench**
2. **Connect to your MySQL server**
3. **Create a new query tab**
4. **Copy and paste the entire content from `database_schema.sql`**
5. **Execute the script** (Ctrl+Shift+Enter or click the lightning bolt)
6. **Verify the database creation** by checking the schema navigator

#### Option B: Using Command Line
```bash
# Connect to MySQL
mysql -u your_username -p

# Execute the schema file
source /path/to/your/project/Backend/database_schema.sql;
```

### Step 2: Environment Configuration

Update your `.env` file in the Backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=click

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Step 3: Test Database Connection

Run the updated setup script:
```bash
cd Backend
npm run setup-db
```

## 📊 Database Schema Overview

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | User authentication & profiles | Email verification, role-based access |
| `projects` | Project management | Budget tracking, progress monitoring |
| `project_members` | Team collaboration | Many-to-many user-project relationships |
| `tasks` | Task management | Time tracking, priority levels |
| `comments` | Task discussions | Nested comment support |
| `time_logs` | Time tracking | Start/end time logging |
| `attachments` | File management | File uploads for tasks/projects |
| `notifications` | System alerts | Real-time notifications |
| `project_invitations` | Team invitations | Email-based invitations |
| `audit_logs` | Security audit | Complete activity tracking |
| `settings` | App configuration | Dynamic settings management |

### Key Features

#### 🔐 Security
- **Password Hashing**: bcrypt encryption
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access**: 5 user roles (admin, manager, developer, client, viewer)
- **Audit Logging**: Complete activity tracking
- **Email Verification**: OTP-based verification

#### 📈 Performance
- **Strategic Indexing**: Optimized for common queries
- **Composite Indexes**: Multi-column performance
- **Efficient Relationships**: Proper foreign key constraints
- **Views**: Pre-computed complex queries

#### 🔄 Automation
- **Triggers**: Auto-update project progress
- **Stored Procedures**: Common operations
- **Default Values**: Smart defaults for new records

## 🛠 Development Workflow

### 1. Database Migrations
For future schema changes, create migration files:
```sql
-- migrations/001_add_new_feature.sql
ALTER TABLE users ADD COLUMN new_feature VARCHAR(100);
```

### 2. Testing Data
Insert test data for development:
```sql
-- Insert test projects
INSERT INTO projects (name, description, created_by, status) VALUES
('Test Project 1', 'A test project for development', 1, 'in_progress'),
('Test Project 2', 'Another test project', 1, 'planning');

-- Insert test tasks
INSERT INTO tasks (title, description, project_id, assigned_to, created_by) VALUES
('Design Homepage', 'Create responsive homepage design', 1, 1, 1),
('Setup Database', 'Configure database schema', 1, 1, 1);
```

### 3. API Development
Create controllers for each table:

#### Example: Project Controller
```javascript
// controllers/projectController.js
export const createProject = async (req, res) => {
  // Implementation
};

export const getProjects = async (req, res) => {
  // Implementation
};
```

#### Example: Task Controller
```javascript
// controllers/taskController.js
export const createTask = async (req, res) => {
  // Implementation
};

export const updateTaskStatus = async (req, res) => {
  // Implementation
};
```

## 📋 Next Steps

### Phase 1: Core Backend Development (Week 1-2)

#### 1.1 Authentication System
- [x] User registration with email verification
- [x] User login with JWT
- [ ] Password reset functionality
- [ ] Profile management
- [ ] Role-based middleware

#### 1.2 Project Management APIs
- [ ] Create/Read/Update/Delete projects
- [ ] Project member management
- [ ] Project invitation system
- [ ] Project statistics and reporting

#### 1.3 Task Management APIs
- [ ] Create/Read/Update/Delete tasks
- [ ] Task assignment and status updates
- [ ] Task comments system
- [ ] Time tracking functionality

### Phase 2: Advanced Features (Week 3-4)

#### 2.1 File Management
- [ ] File upload system
- [ ] File type validation
- [ ] File storage (local/cloud)
- [ ] File sharing and permissions

#### 2.2 Notification System
- [ ] Real-time notifications
- [ ] Email notifications
- [ ] Notification preferences
- [ ] Notification history

#### 2.3 Reporting & Analytics
- [ ] Project progress reports
- [ ] Time tracking reports
- [ ] User activity reports
- [ ] Dashboard statistics

### Phase 3: Frontend Integration (Week 5-6)

#### 3.1 Dashboard Development
- [ ] User dashboard with project overview
- [ ] Task management interface
- [ ] Team collaboration features
- [ ] Real-time updates

#### 3.2 Advanced UI Features
- [ ] Drag-and-drop task management
- [ ] Gantt chart for project timeline
- [ ] File upload interface
- [ ] Notification center

### Phase 4: Testing & Deployment (Week 7-8)

#### 4.1 Testing
- [ ] Unit tests for all APIs
- [ ] Integration tests
- [ ] Database migration tests
- [ ] Security testing

#### 4.2 Deployment
- [ ] Production database setup
- [ ] Environment configuration
- [ ] Performance optimization
- [ ] Monitoring and logging

## 🔧 Database Maintenance

### Regular Tasks
1. **Backup Database**: Daily automated backups
2. **Monitor Performance**: Check slow query logs
3. **Update Indexes**: Analyze and optimize indexes
4. **Clean Audit Logs**: Archive old audit records
5. **Update Statistics**: Refresh table statistics

### Performance Monitoring
```sql
-- Check slow queries
SHOW PROCESSLIST;

-- Analyze table performance
ANALYZE TABLE users, projects, tasks;

-- Check index usage
SHOW INDEX FROM users;
```

### Backup Strategy
```bash
# Daily backup
mysqldump -u username -p click > backup_$(date +%Y%m%d).sql

# Restore backup
mysql -u username -p click < backup_20241201.sql
```

## 🚨 Important Notes

### Security Considerations
1. **Change default admin password** immediately after setup
2. **Use strong JWT secrets** in production
3. **Enable SSL** for database connections
4. **Regular security audits** of audit logs
5. **Implement rate limiting** for API endpoints

### Performance Tips
1. **Monitor query performance** regularly
2. **Use connection pooling** in production
3. **Implement caching** for frequently accessed data
4. **Optimize indexes** based on query patterns
5. **Archive old data** to maintain performance

### Development Best Practices
1. **Use migrations** for schema changes
2. **Test with realistic data** volumes
3. **Implement proper error handling**
4. **Use transactions** for complex operations
5. **Document API endpoints** thoroughly

## 📞 Support & Troubleshooting

### Common Issues

#### Connection Issues
```bash
# Check MySQL service
sudo systemctl status mysql

# Check connection
mysql -u username -p -h localhost
```

#### Permission Issues
```sql
-- Grant permissions
GRANT ALL PRIVILEGES ON click.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

#### Performance Issues
```sql
-- Check slow queries
SHOW VARIABLES LIKE 'slow_query_log';

-- Optimize tables
OPTIMIZE TABLE users, projects, tasks;
```

### Getting Help
1. Check MySQL error logs
2. Review application logs
3. Test database connectivity
4. Verify environment variables
5. Check firewall settings

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintainer**: ClickSpark Development Team
