import { EditingUserEventEnum } from 'shared';
import { Namespace, Server, Socket } from 'socket.io';
import { Inject, Service } from 'typedi';

import { Winston } from '../lib/winston';
import { editingUserSchema } from '../schemas/editingUser.schema';
import { EditingUserService } from '../services/editingUser.service';
import { EventEmitter } from '../utils/eventEmitter';

@Service()
export class EditingUserSocket {
  private namespace: Namespace;

  @Inject()
  private readonly editingUserService!: EditingUserService;

  @Inject()
  private readonly eventEmitter!: EventEmitter;

  @Inject()
  private readonly logger!: Winston;

  constructor(server: Server) {
    this.namespace = server.of('/editing-user');
  }

  public init(): void {
    this.eventEmitter.on('quotes:updated', quoteId => {
      const status = this.editingUserService.getStatus(quoteId);
      this.namespace.to(quoteId).emit(EditingUserEventEnum.EditStatus, status);
    });
    this.namespace.on('connection', socket => {
      socket.on(EditingUserEventEnum.StartEdit, payload => this.onStartEdit(socket, payload));
      socket.on(EditingUserEventEnum.StopEdit, () => this.onStopEdit(socket));
      socket.on('disconnecting', () => this.onStopEdit(socket));
    });
  }

  private async onStartEdit(socket: Socket, payload: unknown): Promise<void> {
    try {
      const { quoteId, signum } = await editingUserSchema.editStartPayload.validate(payload);
      await socket.join(quoteId);
      this.editingUserService.add({
        quoteId,
        signum,
        socketId: socket.id
      });
      const status = this.editingUserService.getStatus(quoteId);
      this.namespace.to(quoteId).emit(EditingUserEventEnum.EditStatus, status);
    } catch (err) {
      this.logger.error(err);
    }
  }

  private async onStopEdit(socket: Socket): Promise<void> {
    try {
      const presentInRooms = Array.from(socket.rooms).filter(item => item !== socket.id);
      presentInRooms.forEach(quoteId => {
        socket.leave(quoteId);
        this.editingUserService.removeBySocket(socket.id);
        const status = this.editingUserService.getStatus(quoteId);
        this.namespace.to(quoteId).emit(EditingUserEventEnum.EditStatus, status);
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
