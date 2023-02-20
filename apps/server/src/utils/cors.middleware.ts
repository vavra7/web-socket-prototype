import { NextFunction, Request, Response } from 'express';

export const corsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
};
