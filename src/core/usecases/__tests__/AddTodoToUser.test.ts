import { mock, instance, when, verify } from 'ts-mockito';
import { AddTodoToUser } from '../AddTodoToUser';
import { UserRepository, TodoRepository } from '../../repositories';
import { NewTodo, Todo } from '../../entities/ToDo';

describe('AddTodoToUser', () => {
  let userRepository: UserRepository;
  let todoRepository: TodoRepository;
  let addTodoToUser: AddTodoToUser;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    todoRepository = mock<TodoRepository>();
    addTodoToUser = new AddTodoToUser(
      instance(userRepository),
      instance(todoRepository),
    );
  });

  it('should add a todo to a user', async () => {
    const userId = 'user-id';
    const newTodo: NewTodo = {
      title: 'New Todo',
      completed: true,
    };
    const todo = new Todo(
      'todo-id',
      newTodo.title,
      newTodo.completed
    );
    const expectedTodoId = 'todo-id';

    when(todoRepository.add(newTodo)).thenResolve(todo);
    when(userRepository.addTodo(userId, todo.id)).thenResolve(expectedTodoId);

    const result = await addTodoToUser.execute(userId, newTodo);

    expect(result).toEqual(expectedTodoId);
    verify(todoRepository.add(newTodo)).once();
    verify(userRepository.addTodo(userId, todo.id)).once();
  });

  it('should delete the added todo if adding to user failed', async () => {
    const userId = 'user-id';
    const newTodo: NewTodo = {
      title: 'New Todo',
      completed: false,
    };
    const todo = new Todo(
      'todo-id',
      newTodo.title,
      newTodo.completed
    );

    when(todoRepository.add(newTodo)).thenResolve(todo);
    when(userRepository.addTodo(userId, todo.id)).thenReject(new Error());

    await expect(addTodoToUser.execute(userId, newTodo)).rejects.toThrow(Error);
    verify(todoRepository.add(newTodo)).once();
    verify(userRepository.addTodo(userId, todo.id)).once();
    verify(todoRepository.delete(todo.id)).once();
  });
});
