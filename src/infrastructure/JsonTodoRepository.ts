import fs from 'fs';
import { Todo } from '../core/entities';
import { NewTodo } from '../core/entities/ToDo';
import { TodoRepository } from '../core/repositories';

export class JsonTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  constructor(private readonly filePath: string) {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
    this.loadFromJson();
  }

  async add(todo: NewTodo): Promise<Todo> {
    await this.loadFromJson(); // загрузить данные из todo.json
    const newTodo = {
      ...todo,
      id: Date.now().toString() // генерация уникального идентификатора
    };
    this.todos.push(newTodo);
    await this.saveToJson(); // сохранить данные в todo.json
    return newTodo
  }

  async delete(id: string): Promise<void> {
    await this.loadFromJson(); // загрузить данные из todo.json
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      await this.saveToJson();
    }
  }

  async getAll(): Promise<Todo[]> {
    await this.loadFromJson(); // загрузить данные из todo.json
    return this.todos.slice(); // вернуть копию массива todos
  }

  async getById(id:string): Promise<Todo> {
    await this.loadFromJson(); // загрузить данные из todo.json
    return this.todos.find((todo)=> todo.id === id); // вернуть todo
  }
    

  async update(todo: Todo): Promise<Todo> {
    await this.loadFromJson();
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todos[index] = todo;
      await this.saveToJson();
      return todo;
    }
  }

  private async loadFromJson(): Promise<void> {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      this.todos = JSON.parse(data) as Todo[];
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File not found, ignore error
      } else {
        throw error;
      }
    }
  }

  private async saveToJson(): Promise<void> {
    const data = JSON.stringify(this.todos);
    await fs.promises.writeFile(this.filePath, data);
  }
}
