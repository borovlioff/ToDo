import { Todo } from '../../entities';
import { NewTodo } from '../../entities/ToDo';
import { TodoRepository } from '../../repositories';
import { AddTodo } from '../AddTodo';
import { instance, mock, verify, when } from 'ts-mockito';

describe('AddTodo', () => {
  let addTodo: AddTodo;
  let mockedTodoRepository: TodoRepository;

  beforeEach(() => {
    mockedTodoRepository = mock<TodoRepository>();
    addTodo = new AddTodo(instance(mockedTodoRepository));
  });

  it('should add a new todo', async () => {
    const newTodo: NewTodo = {
      title: 'Test todo',
      completed: false,
    };

    const expectedTodo: Todo = {
      id: '1234',
      title: 'Test todo',
      completed: false,
    };

    when(mockedTodoRepository.add(newTodo)).thenResolve(expectedTodo);

    const result = await addTodo.execute(newTodo);

    expect(result).toEqual(expectedTodo);
    verify(mockedTodoRepository.add(newTodo)).once();
  });

  it('should throw an error when todoRepository.add() throws an exception', async () => {
    const newTodo: NewTodo = {
      title: 'Test todo',
      completed: false,
    };

    const expectedError = new Error('Failed to add todo');

    when(mockedTodoRepository.add(newTodo)).thenReject(expectedError);

    await expect(addTodo.execute(newTodo)).rejects.toThrow(expectedError);

    verify(mockedTodoRepository.add(newTodo)).once();
  });
});
