import { Router } from 'express';
import {
  getConversations,
  postConversation,
} from '../controllers/conversation.controller.js';
import validateQuestion from '../middleware/validateQuestion.js';

const router = Router();

router.get('/conversations', getConversations);
router.post('/conversations', validateQuestion, postConversation);

export default router;
