import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { AppError } from './error.middleware.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Unauthorized: Missing or invalid token', 401));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(new AppError('Unauthorized: Missing token', 401));
  }

  try {
    const payload = verifyAccessToken(token);
    // Attach user to request object
    (req as any).user = payload;
    next();
  } catch (error) {
    return next(new AppError('Unauthorized: Invalid or expired token', 401));
  }
};
