import { Todo } from '../../entities';
import { TodoRepository } from '../../repositories';
import { UpdateTodo } from '../UpdateTodo';
import { mock, instance, when, verify } from 'ts-mockito';

describe('UpdateTodo', () => {
  let todoRepository: TodoRepository;
  let updateTodo: UpdateTodo;

  beforeEach(() => {
    todoRepository = mock<TodoRepository>();
    updateTodo = new UpdateTodo(instance(todoRepository));
  });

  it('should update a todo', async () => {
    const todo: Todo = { id: '1', title: 'Todo 1', completed: false };
    const updatedTodo: Todo = { ...todo, completed: true };
    when(todoRepository.update(updatedTodo)).thenResolve(updatedTodo);

    const result = await updateTodo.execute(updatedTodo);

    expect(result).toEqual(updatedTodo);
    verify(todoRepository.update(updatedTodo)).once();
  });

  it('should return an error if todoRepository.update throws an error', async () => {
    const todo: Todo = { id: '1', title: 'Todo 1', completed: false };
    const updatedTodo: Todo = { ...todo, completed: true };
    const error = new Error('Unable to update todo');
    when(todoRepository.update(updatedTodo)).thenReject(error);

    await expect(updateTodo.execute(updatedTodo)).rejects.toThrow(error);

    verify(todoRepository.update(updatedTodo)).once();
  });
});
