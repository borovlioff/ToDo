import { AddTodoToUser } from '../AddTodoToUser';
import { UserRepository, TodoRepository } from '../../repositories';
import { NewTodo, Todo } from '../../entities/ToDo';

describe('AddTodoToUser', () => {
  let userRepository: UserRepository;
  let todoRepository: TodoRepository;
  let addTodoToUser: AddTodoToUser;

  beforeEach(() => {
    userRepository = {
      getById: jest.fn(),
      getByAuthId: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      addTodo: jest.fn(),
      deleteTodoById: jest.fn(),
    };

    todoRepository = {
      add: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    addTodoToUser = new AddTodoToUser(userRepository, todoRepository);
  });

  it('adds a new todo to a user', async () => {
    const userId = '1';
    const newTodo: NewTodo = {
      title: 'Test Todo',
      completed: false
    };
    const todoId = '2';
  

    (todoRepository.add as jest.Mock).mockResolvedValueOnce(new Todo(todoId, newTodo.title, newTodo.completed ));
    (userRepository.addTodo as jest.Mock).mockResolvedValueOnce(todoId);

    const result = await addTodoToUser.execute(userId, newTodo);
    expect(result).toBe(todoId);
    expect(userRepository.addTodo).toHaveBeenCalledWith(userId, todoId);
    expect(todoRepository.add).toHaveBeenCalledWith(newTodo);
  });

  it('deletes the created todo if adding it to user fails', async () => {
    const userId = '1';
    const newTodo: NewTodo = {
      title: 'Test Todo',
      completed: false
    };
    const todoId = '2';

    (todoRepository.add as jest.Mock).mockResolvedValueOnce(new Todo(todoId, newTodo.title, newTodo.completed ));
    (userRepository.addTodo as jest.Mock).mockRejectedValueOnce(new Error('Add todo failed'));
    (todoRepository.delete as jest.Mock).mockResolvedValueOnce(undefined);

    try {
      await addTodoToUser.execute(userId, newTodo);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeDefined();
      expect(todoRepository.delete).toHaveBeenCalledWith(todoId);
    }
  });
});
