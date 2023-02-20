import path from 'node:path';

import express, { Application } from 'express';
import { Service } from 'typedi';

import { quoteRouter } from './routes';
import { bodyParserMiddleware } from './utils/bodyParser.middleware';
import { corsMiddleware } from './utils/cors.middleware';
import { errorHandlerMiddleware } from './utils/errorHandler.middleware';

@Service()
export class Express {
  public app: Application;

  constructor() {
    this.app = express();
    this.init();
  }

  public async init(): Promise<void> {
    await this.beforeHandleRoutes();
    await this.handleRoutes();
    await this.afterHandleRoutes();
  }

  private async beforeHandleRoutes(): Promise<void> {
    this.app.use(corsMiddleware);
    this.app.use(bodyParserMiddleware);
  }

  private async handleRoutes(): Promise<void> {
    this.app.use('/', express.static(path.join(__dirname, '../public')));
    this.app.use(quoteRouter);
  }

  private async afterHandleRoutes(): Promise<void> {
    this.app.use(errorHandlerMiddleware);
  }
}
