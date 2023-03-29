import { Todo } from '../entities';
import { TodoRepository } from '../repositories';

export class GetAllTodos {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]|Error> {
    return this.todoRepository.getAll();
  }
}