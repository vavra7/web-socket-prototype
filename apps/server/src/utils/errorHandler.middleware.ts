import type { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';

import { ErrorResponse } from '../types/error.type';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  let status: number;
  let errorResponse: ErrorResponse;
  if (err instanceof ValidationError) {
    const message = 'Arguments validation error';
    status = 422;
    errorResponse = {
      message,
      extensions: {
        code: 'VALIDATION_ERROR',
        validationErrors: err
      }
    };
  } else {
    const message = 'Internal server error';
    status = 500;
    errorResponse = {
      message: err.message || message,
      extensions: {
        ...err,
        ...(err as any).extensions,
        code: (err as any).code || (err as any).extensions?.code || 'INTERNAL_SERVER_ERROR',
        stack: err.stack?.split('\n')
      }
    };
  }
  res.status(status).json(errorResponse);
};
