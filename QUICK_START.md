# 🚀 ClickSpark Database - Quick Start Guide

## Immediate Setup (5 minutes)

### 1. Prerequisites Check
- ✅ MySQL Server installed and running
- ✅ MySQL Workbench installed (optional but recommended)
- ✅ Node.js and npm installed

### 2. Database Setup

#### Option A: Using MySQL Workbench (Easiest)
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open `database_schema.sql` file
4. Execute the entire script (Ctrl+Shift+Enter)
5. Verify database `click` is created

#### Option B: Using Command Line
```bash
# Connect to MySQL
mysql -u your_username -p

# Execute schema
source Backend/database_schema.sql;
```

### 3. Environment Setup
1. Copy `env.example` to `.env`
2. Update database credentials:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=click
```

### 4. Test Setup
```bash
cd Backend
npm run setup-db
```

### 5. Start Backend
```bash
npm start
```

## ✅ What's Included

### Database Tables (11 tables)
- **users** - User authentication & profiles
- **projects** - Project management
- **project_members** - Team collaboration
- **tasks** - Task management
- **comments** - Task discussions
- **time_logs** - Time tracking
- **attachments** - File management
- **notifications** - System alerts
- **project_invitations** - Team invitations
- **audit_logs** - Security audit
- **settings** - App configuration

### Features
- 🔐 **Security**: JWT auth, bcrypt passwords, role-based access
- 📊 **Performance**: Optimized indexes, views, stored procedures
- 🔄 **Automation**: Triggers, auto-updates, audit logging
- 📧 **Notifications**: Email system, OTP verification
- 📁 **File Management**: Upload system with validation

### Default Admin User
- **Email**: admin@clickspark.com
- **Password**: admin123
- **Role**: admin

⚠️ **Important**: Change the admin password immediately after setup!

## 🎯 Next Steps

1. **Test API Endpoints**:
   - POST `/api/auth/register` - User registration
   - POST `/api/auth/login` - User login
   - GET `/api/users/profile` - Get user profile

2. **Create Your First Project**:
   - Use the admin account to create projects
   - Add team members
   - Create tasks

3. **Explore Features**:
   - Check the `DATABASE_WORKFLOW.md` for detailed documentation
   - Review the API structure in `routes/` and `controllers/`
   - Test the notification system

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error**:
```bash
# Check MySQL service
sudo systemctl status mysql

# Test connection
mysql -u username -p -h localhost
```

**Permission Denied**:
```sql
GRANT ALL PRIVILEGES ON click.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

**Schema File Not Found**:
- Ensure `database_schema.sql` is in the Backend directory
- Check file permissions

### Getting Help
1. Check the `DATABASE_WORKFLOW.md` for detailed documentation
2. Review MySQL error logs
3. Verify environment variables
4. Test database connectivity

---

**Ready to start building! 🎉**

Your ClickSpark database is now ready for development. The comprehensive schema includes everything you need for a full-featured project management platform.
