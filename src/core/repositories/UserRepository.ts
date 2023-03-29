import { TodoId } from '../entities/ToDo';
import { NewUser, User } from '../entities/User';

export interface UserRepository {
  getById(id: string): Promise<User | null | Error>;
  getByAuthId(authId: string): Promise<User | null | Error>;
  add(user: NewUser): Promise<User | Error>;
  update(user: User): Promise<User | Error>;
  delete(id: string): Promise<void|Error>;
  addTodo(userId:string, todoId:TodoId):Promise<TodoId|Error>
  deleteTodoById(userId:string, todoId:TodoId):Promise<void|Error>
}