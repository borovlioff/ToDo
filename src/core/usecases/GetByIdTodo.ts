import { Todo } from '../entities';
import { TodoRepository } from '../repositories';

export class GetByIdTodo {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(id:string): Promise<Todo|Error> {
    return this.todoRepository.getById(id);
  }
}