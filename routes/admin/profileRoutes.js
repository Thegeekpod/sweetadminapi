import express from 'express';
import { verifyToken } from '../../utils/authUtils.js';
import { viewProfile } from '../../controllers/admin/profileController.js';
const router = express.Router();


router.get('/', verifyToken, viewProfile);

export default router;
