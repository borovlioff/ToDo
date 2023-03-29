import { Todo } from '../core/entities';
import { NewTodo } from '../core/entities/ToDo';
import { TodoRepository } from '../core/repositories/TodoRepository';

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  async add(todo: NewTodo): Promise<Todo> {
    const newTodo = {
      title:todo.title,
      completed:todo.completed,
      id: Date.now().toString() // генерация уникального идентификатора
    };
    this.todos.push(newTodo);
    return newTodo
  }

  async delete(id: string): Promise<void> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }

  async getAll(): Promise<Todo[]> {
    return this.todos;
  }

  async getById(id:string): Promise<Todo> {
    return this.todos.find((todo)=> todo.id === id); // вернуть todo
  }

  async update(todo: Todo): Promise<Todo> {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index >= 0) {
      this.todos[index] = {title:todo.title, completed:todo.completed, id:todo.id};
      return todo
    }
  }

}