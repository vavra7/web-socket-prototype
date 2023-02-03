import express from 'express';

import { quoteRouter } from './quote.router';

const router = express.Router();

router.use(quoteRouter);

export { router };
