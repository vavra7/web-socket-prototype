import http, { IncomingMessage, Server as HttpServer, ServerResponse } from 'http';
import { Server as WsServer } from 'socket.io';
import Container, { Service } from 'typedi';

import { Config } from './config';
import { Express } from './express';
import { Winston } from './lib/winston';
import { EditingUserSocket } from './sockets/editingUser.socket';
import { BindThis } from './utils/bindThis.decorator';

@Service()
export class Server {
  private httpServer: HttpServer;
  private config: Config;
  private logger: Winston;

  constructor(config: Config, logger: Winston, express: Express) {
    this.httpServer = http.createServer(express.app);
    this.config = config;
    this.logger = logger;
    this.setUpWs();
  }

  public listen(): void {
    this.httpServer.on('listening', this.onListening);
    this.httpServer.listen(this.config.port);
    this.httpServer.on('request', this.onRequest);
  }

  @BindThis()
  private onListening(): void {
    this.logger.info(`Started service ${this.config.serviceName} on ${this.config.url}`);
  }

  @BindThis()
  private onRequest(req: IncomingMessage, res: ServerResponse): void {
    this.logger.http(`<- Incoming request ${req.method} ${req.url}`, { req, res });
    res.on('finish', () =>
      this.logger.http(`-> Outgoing response ${req.method} ${req.url} ${res.statusCode}`, {
        req,
        res
      })
    );
  }

  private setUpWs(): void {
    const wsServer = new WsServer(this.httpServer, {
      cors: {
        origin: '*'
      }
    });
    Container.set(WsServer, wsServer);
    Container.get(EditingUserSocket);
  }
}
