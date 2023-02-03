import { WinstonAbstract } from '@vavra7/logger';
import { Service } from 'typedi';

import { Config } from '../../config';

@Service()
export class Winston extends WinstonAbstract {
  constructor(config: Config) {
    super({
      serviceName: config.serviceName,
      level: 'debug'
    });
  }
}
