import { InMemoryUserRepository } from '../../../infrastructure/InMemoryUserRepository';
import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';
import { CreateUser } from '../CreateUser';
import { NewUser, User } from '../../entities/User';
import { TodoRepository, UserRepository } from '../../repositories';

describe('CreateUser', () => {
    let userRepository: UserRepository;
    let todoRepository: TodoRepository;
    let createUser: CreateUser;

    beforeEach(() => {
        todoRepository = new InMemoryTodoRepository();
        userRepository = new InMemoryUserRepository(todoRepository);
        createUser = new CreateUser(userRepository);
    });


    describe('execute', () => {
        it('should create a new user with an empty todo list', async () => {
            const newUser = {
                authId: '12345',
            };
            const createdUser = await createUser.execute(newUser);
            if (createdUser instanceof Error) {

            } else {
                expect(createdUser.id).toBeTruthy();
                expect(createdUser.authId).toBe(newUser.authId);
                expect(createdUser.todos).toEqual([]);
            }
        });

        it('should create a new user with an existing todo item', async () => {
            const todo = await todoRepository.add({ title: 'test todo', completed: false });
            if (todo instanceof Error) { }
            else {
                const newUser = {
                    authId: '12345',
                    todos: [todo.id],
                };
                const createdUser = await createUser.execute(newUser);

                if (createdUser instanceof User) {
                    expect(createdUser.id).toBeTruthy();
                    expect(createdUser.authId).toBe(newUser.authId);
                    expect(createdUser.todos).toEqual([todo.id]);
                }
            }
        });
    });
});
