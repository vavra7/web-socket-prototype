import express from 'express';
import Container from 'typedi';

import { QuoteController } from '../controllers/quote.controller';

const quoteRouter = express.Router();
const quoteController = Container.get(QuoteController);

quoteRouter.get('/quotes', (req, res, next) => quoteController.readAll(req, res, next));
quoteRouter.get('/quotes/:id', (req, res, next) => quoteController.read(req, res, next));
quoteRouter.put('/quotes/:id', (req, res, next) => quoteController.update(req, res, next));

export { quoteRouter };
