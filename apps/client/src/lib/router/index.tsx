import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../../pages/home.page';
import QuotePage from '../../pages/quote.page';
import QuotesPage from '../../pages/quotes.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/quotes',
    element: <QuotesPage />
  },
  {
    path: '/quotes/:quoteId',
    element: <QuotePage />
  }
]);
