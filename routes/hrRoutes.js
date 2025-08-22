import express from 'express';
const router = express.Router();
import * as hrController from '../controllers/hrController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

// Apply authentication middleware to all HR routes (temporarily disabled for testing)
// router.use(verifyToken);

// Get all users for HR dashboard
router.get('/users', hrController.getAllUsers);

// Get dashboard statistics
router.get('/stats', hrController.getDashboardStats);

// Search users
router.get('/search', hrController.searchUsers);

// Update user status
router.patch('/users/:userId/status', hrController.updateUserStatus);

// Update user role
router.patch('/users/:userId/role', hrController.updateUserRole);

// Delete user
router.delete('/users/:userId', hrController.deleteUser);

// Get user activity logs
router.get('/users/:userId/activity', hrController.getUserActivity);

// Get all consultation requests
router.get('/consultations', hrController.getAllConsultations);

// Get all contacts
router.get('/contacts', hrController.getAllContacts);

// Send email
router.post('/send-email', hrController.sendEmail);

export default router;
