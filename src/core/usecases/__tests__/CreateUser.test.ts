import { mock, instance, when, verify } from 'ts-mockito';
import { CreateUser } from '../CreateUser';
import { UserRepository } from '../../repositories';
import { NewUser, User } from '../../entities/User';

describe('CreateUser', () => {
  let userRepository: UserRepository;
  let createUser: CreateUser;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    createUser = new CreateUser(instance(userRepository));
  });

  it('should create a new user', async () => {
    const newUser = {
      authId: 'authId1',
      todos:[],
    };
    const user = new User('user-id', newUser.authId, newUser.todos);

    when(userRepository.add(newUser)).thenResolve(user);

    const result = await createUser.execute(newUser);

    expect(result).toEqual(user);
    verify(userRepository.add(newUser)).once();
  });

  it('should throw an error if user creation failed', async () => {
    const newUser = {
        authId: 'authId1',
        todos:[],
      };
    const error = new Error('Failed to create user');

    when(userRepository.add(newUser)).thenReject(error);

    await expect(createUser.execute(newUser)).rejects.toThrow(error);
    verify(userRepository.add(newUser)).once();
  });
});
