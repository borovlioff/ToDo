import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { Todo } from '../../entities';
import { TodoRepository } from '../../repositories';
import { DeleteTodo } from '../DeleteTodo';

describe('AddTodo', () => {
  it('should add a new todo', async () => {
    const todoRepository: TodoRepository = new InMemoryTodoRepository();
    const deleteTodo = new DeleteTodo(todoRepository);

    const newTodo = {
      title: 'Test todo',
      completed: false,
    };

    const todo = await todoRepository.add(newTodo);
    if (todo instanceof Todo) {
      await deleteTodo.execute(todo.id);
      expect(await todoRepository.getAll()).not.toContainEqual(todo);
    }

  });
});