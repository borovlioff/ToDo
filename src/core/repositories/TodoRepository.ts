import { Todo } from '../entities';
import { NewTodo } from '../entities/ToDo';

export interface TodoRepository {
  add(newTodo:NewTodo): Promise<Todo|Error>;
  update(todo: Todo): Promise<Todo|Error>;
  delete(id: string): Promise<void|Error>;
  getAll(): Promise<Todo[]|Error>;
  getById(id: string): Promise<Todo|null|Error>;
}