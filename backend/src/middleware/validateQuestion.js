import AppError from '../utils/AppError.js';

const MAX_LENGTH = 65535;

export default function validateQuestion(req, res, next) {
  const { question } = req.body || {};

  if (typeof question !== 'string' || question.trim() === '') {
    return next(new AppError('question is required', 400));
  }
  if (question.length > MAX_LENGTH) {
    return next(new AppError('question is too long', 400));
  }

  req.body.question = question.trim();
  next();
}
