import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { Server as WsServer } from 'socket.io';
import Container, { Inject, Service } from 'typedi';

import { Config } from './config';
import { Express } from './express';
import { Winston } from './lib/winston';
import { EditingUserSocket } from './sockets/editingUser.socket';
import { BindThis } from './utils/bindThis.decorator';

@Service()
export class HttpServer {
  private server: Server;

  @Inject()
  private readonly config!: Config;

  @Inject()
  private readonly express!: Express;

  @Inject()
  private readonly logger!: Winston;

  constructor() {
    this.server = http.createServer();
  }

  public init(): void {
    this.express.init();
    this.server.on('listening', this.onListening);
    this.server.on('request', this.onRequest);
    this.initWs();
    this.server.listen(this.config.port);
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
    this.express.app(req, res);
  }

  private initWs(): void {
    const wsServer = new WsServer(this.server, {
      cors: {
        origin: '*'
      }
    });
    Container.set(WsServer, wsServer);
    Container.get(EditingUserSocket).init();
  }
}
