import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { UpdateTodo } from '../UpdateTodo';

describe('UpdateTodo', () => {
  it('should update a todo', async () => {
    const todoRepository = new InMemoryTodoRepository();
    const updateTodo = new UpdateTodo(todoRepository);

    const newTodo = {
      title: 'Test todo',
      description: 'This is a test todo',
      completed: false,
      userId: '1',
    };
    const addedTodo = await todoRepository.add(newTodo);

    const updatedTodo = {
      ...addedTodo,
      title: 'Updated test todo',
      completed: true,
    };
    await updateTodo.execute(updatedTodo);

    const fetchedTodo = await todoRepository.getById(addedTodo.id);
    expect(fetchedTodo.title).toBe(updatedTodo.title);
    expect(fetchedTodo.completed).toBe(updatedTodo.completed);
  });
});
