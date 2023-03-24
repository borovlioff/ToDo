import { Todo } from '../entities';
import { NewTodo } from '../entities/ToDo';
import { TodoRepository } from '../repositories';

export class AddTodo {
  constructor(private readonly todoRepository: TodoRepository) {}

   async execute(todo: NewTodo): Promise<Todo> {
   return await this.todoRepository.add(todo);
  }
}