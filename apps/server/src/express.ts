import express, { Application } from 'express';
import path from 'path';
import { Service } from 'typedi';

import { router } from './routes';
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
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private async handleRoutes(): Promise<void> {
    this.app.use(router);
  }

  private async afterHandleRoutes(): Promise<void> {
    this.app.use(errorHandlerMiddleware);
  }
}
