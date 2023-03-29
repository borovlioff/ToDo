import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { InMemoryUserRepository } from '../../../infrastructure/InMemoryUserRepository';
import { User } from '../../entities';
import { TodoRepository, UserRepository } from '../../repositories';
import { DeleteUserById } from '../DeleteUserById';

describe('DeleteUserById', () => {
  let todoRepository: TodoRepository
  let userRepository: UserRepository;
  let deleteUserById: DeleteUserById;

  beforeEach(() => {
    todoRepository = new InMemoryTodoRepository();
    userRepository = new InMemoryUserRepository(todoRepository);
    deleteUserById = new DeleteUserById(userRepository);
  });

  it('should delete a user by id', async () => {
    const user = await userRepository.add({ authId: '1234' });

    if(user instanceof User){
        await deleteUserById.execute(user.id);
        const deletedUser = await userRepository.getById(user.id);
        expect(deletedUser).toBeNull();
    }
   
  });

  it('should throw an error if the user does not exist', async () => {
    const nonExistingUserId = 'nonExistingUserId';
    await expect(deleteUserById.execute(nonExistingUserId)).rejects.toThrow(
      `User with id ${nonExistingUserId} not found`
    );
  });
});
