import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { TodoRepository } from '../../repositories';

import { AddTodo } from '../AddTodo';

describe('AddTodo', () => {
    it('should add a new todo', async () => {
      const todoRepository:TodoRepository = new InMemoryTodoRepository();
      const addTodo = new AddTodo(todoRepository);
  
      const newTodo = {
        title: 'Test todo',
        completed: false,
      };
  
      const addedTodo = await addTodo.execute(newTodo);
      if (addedTodo instanceof Error) {
        // handle error case
      } else {
        expect(addedTodo.title).toEqual(newTodo.title);
        expect(addedTodo.completed).toEqual(newTodo.completed);
        expect(await todoRepository.getAll()).toContainEqual(addedTodo);
      }
    });
  });