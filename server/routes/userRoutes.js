import {Router} from 'express';
import upload from '../middleware/upload.js';
import { registration, checkAuth, login, logout } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

router.get('/login', authenticateToken, checkAuth);
router.post('/register', upload.single('avatar'), registration);
router.post('/login', login);
router.delete('/logout', logout);

export default router;