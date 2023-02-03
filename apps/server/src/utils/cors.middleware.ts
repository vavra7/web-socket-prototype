import setCors from 'cors';

export const corsMiddleware = setCors({
  origin: '*',
  credentials: true
});
