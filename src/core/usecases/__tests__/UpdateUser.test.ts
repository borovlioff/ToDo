import { User } from '../../entities';
import { UserRepository } from '../../repositories';
import { UpdateUser } from '../UpdateUser';
import { instance, mock, verify, when } from 'ts-mockito';

describe('UpdateUser', () => {
  const mockUserRepository = mock<UserRepository>();
  const updateUser = new UpdateUser(instance(mockUserRepository));

  it('should update a user', async () => {
    const updatedUser = new User('1', 'Alice', []);
    when(mockUserRepository.update(updatedUser)).thenResolve(updatedUser);

    const result = await updateUser.execute(updatedUser);

    expect(result).toEqual(updatedUser);
    verify(mockUserRepository.update(updatedUser)).called();
  });

  it('should return an error if userRepository.update throws an error', async () => {
    const updatedUser = new User('1', 'Alice', []);
    const error = new Error('Failed to update user');
    when(mockUserRepository.update(updatedUser)).thenReject(error);

    await expect(updateUser.execute(updatedUser)).rejects.toThrow(error);
    verify(mockUserRepository.update(updatedUser)).called();
  });
});
