import { InMemoryUserRepository } from '../../../infrastructure/InMemoryUserRepository';
import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { GetUserById } from '../GetUserById';
import {   User } from '../../entities';
import { TodoRepository, UserRepository } from '../../repositories';

describe('GetUser', () => {
  let userRepository: UserRepository;
  let todoRepository: TodoRepository
  let getUser: GetUserById;

  beforeEach(() => {
    todoRepository = new InMemoryTodoRepository();
    userRepository = new InMemoryUserRepository(todoRepository);
    getUser = new GetUserById(userRepository);
  });

  it('should get a user by id', async () => {

    await userRepository.add({
      authId: '12345',
    });
    const user = await getUser.execute('1');
    if(user instanceof User){
        expect(user.authId).toBe('12345');
    }
    
  });

  it('should return null if user is not found', async () => {
    const user = await getUser.execute('non-existing-id');
    expect(user).toBeNull();
  });
});
