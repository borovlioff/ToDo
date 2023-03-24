import { User } from "../core/entities/User";
import { UserRepository } from "../core/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
    private readonly users: User[] = [];
  
    async getAll(): Promise<User[]> {
      return this.users;
    }
  
    async getById(id: string): Promise<User | undefined> {
      return this.users.find((user) => user.id === id);
    }
  
    async getByEmail(email: string): Promise<User | undefined> {
      return this.users.find((user) => user.email === email);
    }
  
    async add(user: User): Promise<User> {
      const newUser = { ...user, id: String(this.users.length + 1) };
      this.users.push(newUser);
      return newUser;
    }
  
    async update(user: User): Promise<User> {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index === -1) {
        throw new Error(`User with id ${user.id} not found`);
      }
      this.users[index] = user;
      return user;
    }
  
    async delete(id: string): Promise<void> {
      const index = this.users.findIndex((user) => user.id === id);
      if (index === -1) {
        throw new Error(`User with id ${id} not found`);
      }
      this.users.splice(index, 1);
    }
  }