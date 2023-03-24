import { User } from "../entities/User";

export interface UserRepository {
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User | undefined>;
    getByEmail(email: string): Promise<User | undefined>;
    add(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
  }