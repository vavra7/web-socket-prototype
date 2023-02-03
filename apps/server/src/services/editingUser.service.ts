import { EditingUser, EditStatus } from 'shared';
import { Service } from 'typedi';

import { EditingUserRepository } from '../repositories/editingUser.repository';
import { QuoteService } from './quote.service';

@Service()
export class EditingUserService {
  private editingUserRepository: EditingUserRepository;
  private quoteService: QuoteService;

  constructor(editingUserRepository: EditingUserRepository, quoteService: QuoteService) {
    this.editingUserRepository = editingUserRepository;
    this.quoteService = quoteService;
  }

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
