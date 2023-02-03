import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

async function main(): Promise<void> {
  const app = <App />;
  const rootEl = document.getElementById('root');
  if (!rootEl) throw new Error('Root element was not found');
  createRoot(rootEl).render(app);
}

main();
