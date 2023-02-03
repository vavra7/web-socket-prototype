import { Quote, QuoteUpdateInput } from 'shared';
import { Service } from 'typedi';

@Service()
export class QuoteRepository {
  private quotes: Quote[] = [
    {
      id: 'a',
      description: 'quote a',
      version: 1
    },
    {
      id: 'b',
      description: 'quote b',
      version: 1
    },
    {
      id: 'c',
      description: 'quote c',
      version: 1
    }
  ];

  public findAll(): Quote[] {
    return this.quotes;
  }

  public find(id: string): Quote | undefined {
    return this.quotes.find(item => item.id === id);
  }

  public update(id: string, input: QuoteUpdateInput): Quote {
    this.quotes = this.quotes.map(item => {
      if (item.id !== id) {
        return item;
      } else {
        return {
          ...item,
          ...input,
          version: item.version + 1
        };
      }
    });
    return this.quotes.find(item => item.id === id)!;
  }
}
