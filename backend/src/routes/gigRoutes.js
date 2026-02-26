import express from 'express';
import { createGig, getAllGigs } from '../controllers/gigController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createGig);
router.get('/', getAllGigs);

export default router;
