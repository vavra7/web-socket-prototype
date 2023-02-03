import { EventEmitter as NodeEventEmitter } from 'events';
import { Service } from 'typedi';

@Service()
export class EventEmitter extends NodeEventEmitter {}
