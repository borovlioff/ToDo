import { mock, instance, verify, when } from 'ts-mockito';
import { DeleteUserById } from '../DeleteUserById';
import { UserRepository } from '../../repositories';

describe('DeleteUserById', () => {
  let userRepository: UserRepository;
  let deleteUserById: DeleteUserById;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    deleteUserById = new DeleteUserById(instance(userRepository));
  });

  it('should delete a user by id', async () => {
    const userId = 'user-id';

    await deleteUserById.execute(userId);

    verify(userRepository.delete(userId)).once();
  });

  it('should throw an error if user deletion fails', async () => {
    const userId = 'user-id';
    const error = new Error('Failed to delete user');

    // Set up the mock to throw an error when userRepository.delete is called with userId
    when(userRepository.delete(userId)).thenReject(error);

    // Execute the code being tested and expect it to throw the error
    await expect(deleteUserById.execute(userId)).rejects.toThrow(error);

    // Verify that the delete method was called with the expected parameter
    verify(userRepository.delete(userId)).once();
  });
});
