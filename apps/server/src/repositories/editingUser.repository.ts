import { EditingUser } from 'shared';
import { Service } from 'typedi';

@Service()
export class EditingUserRepository {
  private editingUsers: EditingUser[] = [];

  public add(editingUser: EditingUser): void {
    this.editingUsers = this.editingUsers.filter(
      item => item.signum !== editingUser.signum && item.socketId !== editingUser.socketId
    );
    this.editingUsers.push(editingUser);
  }

  public removeBySocket(socketId: string): void {
    this.editingUsers = this.editingUsers.filter(item => item.socketId !== socketId);
  }

  public findByQuote(quoteId: string): EditingUser[] {
    return this.editingUsers.filter(item => item.quoteId === quoteId);
  }
}
