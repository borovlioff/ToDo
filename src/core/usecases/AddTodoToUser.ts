import { NewTodo, TodoId } from '../entities/ToDo';
import { UserRepository, TodoRepository } from '../repositories';

export class AddTodoToUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) { }

  async execute(userId: string, newTodo: NewTodo): Promise<TodoId> {
    try {

      const todo = await this.todoRepository.add(newTodo);

      if (todo) {
        const userTodo = await this.userRepository.addTodo(userId, todo.id);

        if (!userTodo) {
          await this.todoRepository.delete(todo.id);
        }
        
        return userTodo;
      }

    } catch (error) {
      throw error
    }
  }
}
