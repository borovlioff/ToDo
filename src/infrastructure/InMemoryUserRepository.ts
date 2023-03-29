import { TodoRepository, UserRepository } from '../core/repositories';
import { NewUser, User, UserId } from '../core/entities/User';
import { TodoId } from '../core/entities/ToDo';

export class InMemoryUserRepository implements UserRepository {
  private users: User[];

  constructor(
    private readonly _todoRepository:TodoRepository
  ) {
    this.users = [];
  }

  async getById(id: UserId): Promise<User | null> {
    const foundUser = this.users.find(user => user.id === id);
    return foundUser ?? null;
  }

  async getByAuthId(authId: string): Promise<User | null> {
    const foundUser = this.users.find(user => user.authId === authId);
    return foundUser ?? null;
  }

  async add(newUser: NewUser): Promise<User> {
    const nextId = (this.users.length + 1).toString();
    const user = new User(nextId, newUser.authId, newUser.todos||[]);
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index === -1) {
      return null;
    }
    this.users[index] = user;
    return user;
  }

  async delete(id: UserId): Promise<void> {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
  }

  async addTodo(userId: UserId, todoId: TodoId): Promise<string> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    user.todos.push(todoId);
    return todoId;
  }

  async deleteTodoById(userId: UserId, todoId: TodoId): Promise<void> {
    const user = await this.getById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    await this.update({
        ...user,
        todos: user.todos.filter((t) => t !== todoId)
    }) 
    
    await this._todoRepository.delete(todoId);
    return;
  }
}


