import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { DeleteTodo } from '../DeleteTodo';

describe('AddTodo', () => {
    it('should add a new todo', async () => {
      const todoRepository = new InMemoryTodoRepository();
      const deleteTodo = new DeleteTodo(todoRepository);
  
      const newTodo = {
        title: 'Test todo',
        completed: false,
      };
  
      const todo = await todoRepository.add(newTodo);

      await deleteTodo.execute(todo.id);
      expect(await todoRepository.getAll()).not.toContainEqual(todo);
    });
  });