import { useEffect, useState } from 'react';
import type { Quote } from 'shared';

export type QuotesPayload =
  | {
      data: undefined;
      loading: true;
    }
  | {
      data: Quote[];
      loading: false;
    };

export function useQuotes(): QuotesPayload {
  const [data, setData] = useState<QuotesPayload['data']>();

  useEffect(() => {
    fetch('http://localhost:5000/quotes')
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
