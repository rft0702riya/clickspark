import express from 'express';
import { 
  submitContact, 
  getAllContacts, 
  getContactById, 
  deleteContact 
} from '../controllers/contactController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - Submit contact form
router.post('/submit', submitContact);

// Protected routes - Admin only
router.get('/all', verifyToken, getAllContacts);
router.get('/:id', verifyToken, getContactById);
router.delete('/:id', verifyToken, deleteContact);

export default router;
