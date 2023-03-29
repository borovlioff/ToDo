import { NewTodo, Todo, TodoId } from '../entities/ToDo';
import { UserRepository, TodoRepository } from '../repositories';

export class AddTodoToUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly todoRepository: TodoRepository,
  ) { }

  async execute(userId: string, newTodo: NewTodo): Promise<TodoId> {
    let todoId;
    let addTodoToUserSucces;
    try {
       const todo = await this.todoRepository.add(newTodo);
      if(todo instanceof Todo){
        todoId = todo.id;
        const userTodo = await this.userRepository.addTodo(userId, todo.id);
        if(typeof userTodo === "string"){
          addTodoToUserSucces = true;
          return userTodo;
        }
      }
    } catch (error) {
      if(todoId && !addTodoToUserSucces){
        await this.todoRepository.delete(todoId);  
      }
      throw error
    }
  }
}
