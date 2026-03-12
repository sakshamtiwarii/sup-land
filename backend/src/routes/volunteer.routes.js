import express from 'express';
import { volunteerValidation, submitVolunteer, getAllVolunteers, getVolunteerStats, updateVolunteer, deleteVolunteer } from '../controllers/volunteer.controller.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Routes
router.post('/', volunteerValidation, submitVolunteer);
router.get('/', adminAuth, getAllVolunteers);
router.get('/stats', adminAuth, getVolunteerStats);
router.put('/:id', adminAuth, updateVolunteer);
router.delete('/:id', adminAuth, deleteVolunteer);

export default router;
