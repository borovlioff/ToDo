import { mock, instance, when, verify } from 'ts-mockito';
import { GetUserById } from '../GetUserById';
import { UserRepository } from '../../repositories';
import { User } from '../../entities/User';

describe('GetUserById', () => {
  let userRepository: UserRepository;
  let getUserById: GetUserById;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    getUserById = new GetUserById(
      instance(userRepository),
    );
  });

  it('should return a user by id', async () => {
    const userId = 'user-id';
    const user = new User(userId, 'Test User',[]);
    when(userRepository.getById(userId)).thenResolve(user);

    const result = await getUserById.execute(userId);

    expect(result).toEqual(user);
    verify(userRepository.getById(userId)).once();
  });

  it('should return null if user is not found', async () => {
    const userId = 'user-id';
    when(userRepository.getById(userId)).thenResolve(null);

    const result = await getUserById.execute(userId);

    expect(result).toBeNull();
    verify(userRepository.getById(userId)).once();
  });

  it('should throw an error if an error occurs', async () => {
    const userId = 'user-id';
    const error = new Error('Something went wrong');
    when(userRepository.getById(userId)).thenReject(error);

    await expect(getUserById.execute(userId)).rejects.toThrow(error);
    verify(userRepository.getById(userId)).once();
  });
});
