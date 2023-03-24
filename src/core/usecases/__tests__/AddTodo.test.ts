import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { AddTodo } from '../AddTodo';

describe('AddTodo', () => {
    it('should add a new todo', async () => {
      const todoRepository = new InMemoryTodoRepository();
      const addTodo = new AddTodo(todoRepository);
  
      const newTodo = {
        title: 'Test todo',
        completed: false,
      };
  
      const addedTodo = await addTodo.execute(newTodo);
  
      expect(addedTodo.title).toEqual(newTodo.title);
      expect(addedTodo.completed).toEqual(newTodo.completed);
      expect(await todoRepository.getAll()).toContainEqual(addedTodo);
    });
  });