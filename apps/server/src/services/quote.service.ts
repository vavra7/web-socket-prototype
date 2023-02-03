import { Quote, QuoteUpdateInput } from 'shared';
import { Service } from 'typedi';

import { QuoteRepository } from '../repositories/quote.repository';
import { EventEmitter } from '../utils/eventEmitter';

@Service()
export class QuoteService {
  private quoteRepository: QuoteRepository;
  private eventEmitter: EventEmitter;

  constructor(quoteRepository: QuoteRepository, eventEmitter: EventEmitter) {
    this.quoteRepository = quoteRepository;
    this.eventEmitter = eventEmitter;
  }

  public readAll(): Quote[] {
    return this.quoteRepository.findAll();
  }

  public read(id: string): Quote | undefined {
    return this.quoteRepository.find(id);
  }

  public update(id: string, input: QuoteUpdateInput): Quote {
    const quote = this.quoteRepository.update(id, input);
    this.eventEmitter.emit('quotes:updated', quote.id);
    return quote;
  }
}
