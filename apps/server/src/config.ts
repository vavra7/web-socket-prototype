import { Service } from 'typedi';

@Service()
export class Config {
  public serviceName = 'server';

  public port = 5000;

  public get url(): string {
    return `http://localhost:${this.port}`;
  }
}
