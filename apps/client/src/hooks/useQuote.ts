import { useEffect, useState } from 'react';
import type { Quote } from 'shared';

export type QuotePayload =
  | {
      data: undefined;
      loading: true;
    }
  | {
      data: Quote;
      loading: false;
    };

export function useQuote(quoteId: string): QuotePayload {
  const [data, setData] = useState<QuotePayload['data']>();

  useEffect(() => {
    fetch(`http://localhost:5000/quotes/${quoteId}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  if (data) {
    return {
      loading: false,
      data
    };
  } else {
    return {
      loading: true,
      data: undefined
    };
  }
}
