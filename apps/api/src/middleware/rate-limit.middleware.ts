import rateLimit from 'express-rate-limit';
import { AppError } from './error.middleware.js';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 10, 
  standardHeaders: 'draft-7', 
  legacyHeaders: false, 
  handler: (req, res, next) => {
    next(new AppError('Too many requests from this IP, please try again later.', 429));
  },
});
