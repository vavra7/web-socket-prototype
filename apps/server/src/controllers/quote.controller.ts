import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { quoteSchema } from '../schemas/quote.schema';
import { QuoteService } from '../services/quote.service';

@Service()
export class QuoteController {
  private quoteService: QuoteService;

  constructor(quoteService: QuoteService) {
    this.quoteService = quoteService;
  }

  public read(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = req.params.id;
      const result = this.quoteService.read(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  public readAll(req: Request, res: Response, next: NextFunction): void {
    try {
      const result = this.quoteService.readAll();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const input = await quoteSchema.editInput.validate(req.body);
      const quote = this.quoteService.update(id, input);
      res.json({
        success: true,
        data: quote
      });
    } catch (err) {
      next(err);
    }
  }
}
