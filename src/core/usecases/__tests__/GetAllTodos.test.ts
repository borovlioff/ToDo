import { mock, instance, when } from 'ts-mockito';
import { GetAllTodos } from '../GetAllTodos';
import { TodoRepository } from '../../repositories';
import { Todo } from '../../entities/ToDo';

describe('GetAllTodos', () => {
  let todoRepository: TodoRepository;
  let getAllTodos: GetAllTodos;

  beforeEach(() => {
    todoRepository = mock<TodoRepository>();
    getAllTodos = new GetAllTodos(instance(todoRepository));
  });

  it('should return all todos', async () => {
    const todos: Todo[] = [
      new Todo('1', 'Todo 1', false),
      new Todo('2', 'Todo 2', true),
    ];

    when(todoRepository.getAll()).thenResolve(todos);

    const result = await getAllTodos.execute();

    expect(result).toEqual(todos);
  });

  it('should return an error if the repository throws an error', async () => {
    const error = new Error('Failed to get todos');

    when(todoRepository.getAll()).thenReject(error);

    await expect(getAllTodos.execute()).rejects.toThrowError(error);
  });
});
