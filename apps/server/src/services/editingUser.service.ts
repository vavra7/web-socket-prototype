import { EditingUser, EditStatus } from 'shared';
import { Inject, Service } from 'typedi';

import { EditingUserRepository } from '../repositories/editingUser.repository';
import { QuoteService } from './quote.service';

@Service()
export class EditingUserService {
  @Inject()
  private readonly editingUserRepository!: EditingUserRepository;

  @Inject()
  private readonly quoteService!: QuoteService;

  public add(editingUser: EditingUser): void {
    return this.editingUserRepository.add(editingUser);
  }

  public removeBySocket(socketId: string): void {
    this.editingUserRepository.removeBySocket(socketId);
  }

  public getStatus(quoteId: string): EditStatus {
    const quote = this.quoteService.read(quoteId);
    const editingUsers = this.editingUserRepository.findByQuote(quoteId);
    return {
      lastVersion: quote?.version || null,
      quoteId,
      users: editingUsers.map(item => item.signum)
    };
  }
}
