import { Todo } from '../entities';
import { TodoRepository } from '../repositories';

export class UpdateTodo {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(todo: Todo): Promise<Todo|Error> {
    return await this.todoRepository.update(todo);
  }
}