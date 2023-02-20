import 'reflect-metadata';

import Container from 'typedi';

import { HttpServer } from './httpServer';

Container.get(HttpServer).init();
