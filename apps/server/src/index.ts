import 'reflect-metadata';

import Container from 'typedi';

import { Server } from './server';

Container.get(Server).listen();
