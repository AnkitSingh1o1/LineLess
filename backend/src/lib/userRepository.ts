import { User } from '../types/authTypes';

export class UserRepository {
  private users: User[] = [];

  async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    return this.users.find(user => user.username === username || user.email === email) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}