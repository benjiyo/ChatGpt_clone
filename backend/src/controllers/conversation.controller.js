import * as service from '../services/conversation.service.js';

export async function getConversations(req, res, next) {
  try {
    const conversations = await service.getConversations();
    res.status(200).json({
      success: true,
      message: 'Conversations fetched successfully.',
      data: { conversations },
    });
  } catch (err) {
    next(err);
  }
}

export async function postConversation(req, res, next) {
  try {
    const data = await service.createConversation(req.body.question);
    res.status(201).json({
      success: true,
      message: 'Conversation posted successfully.',
      data,
    });
  } catch (err) {
    next(err);
  }
}
