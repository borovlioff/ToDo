import { mock, instance, when, verify } from 'ts-mockito';
import { TodoRepository } from '../../repositories';
import { DeleteTodo } from '../DeleteTodo';

describe('DeleteTodo', () => {
  let todoRepository: TodoRepository;
  let deleteTodo: DeleteTodo;

  beforeEach(() => {
    todoRepository = mock<TodoRepository>();
    deleteTodo = new DeleteTodo(instance(todoRepository));
  });

  it('should delete a todo successfully', async () => {
    const todoId = 'todo-id';
    await deleteTodo.execute(todoId);

    verify(todoRepository.delete(todoId)).once();
  });

  it('should throw an error when deleting todo fails', async () => {
    const todoId = 'todo-id';
    when(todoRepository.delete(todoId)).thenReject(new Error('Failed to delete todo'));

    await expect(deleteTodo.execute(todoId)).rejects.toThrowError('Failed to delete todo');
    verify(todoRepository.delete(todoId)).once();
  });
});
