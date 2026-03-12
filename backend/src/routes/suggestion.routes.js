import express from 'express';
import { suggestionValidation, submitSuggestion, getAllSuggestions, getSuggestionStats, updateSuggestion, deleteSuggestion } from '../controllers/suggestion.controller.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Routes
router.post('/', suggestionValidation, submitSuggestion);
router.get('/', adminAuth, getAllSuggestions);
router.get('/stats', adminAuth, getSuggestionStats);
router.put('/:id', adminAuth, updateSuggestion);
router.delete('/:id', adminAuth, deleteSuggestion);

export default router;
