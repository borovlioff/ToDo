import { Todo } from '../entities';
import { NewTodo } from '../entities/ToDo';

export interface TodoRepository {
  add(newTodo:NewTodo): Promise<Todo>;
  update(todo: Todo): Promise<Todo>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Todo[]>;
  getById(id: string): Promise<Todo>;
}