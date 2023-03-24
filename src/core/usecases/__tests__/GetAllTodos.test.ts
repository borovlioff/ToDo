import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { GetAllTodos } from '../GetAllTodos';

describe('GetAllTodos', () => {
  it('should return all todos', async () => {
    const todoRepository = new InMemoryTodoRepository();
    const getAllTodos = new GetAllTodos(todoRepository);

    const newTodos = [
      {
        title: 'Test todo 1',
        completed: false,
      },
      {
        title: 'Test todo 2',
        completed: true,
      },
    ];

    
    const todo1 =  await todoRepository.add(newTodos[0]);
    const todo2 =  await todoRepository.add(newTodos[1]);

    const todos = await getAllTodos.execute();

    expect(todos.length).toBe(2);
    expect(todos).toEqual(expect.arrayContaining([todo1,todo2]));
  });
});