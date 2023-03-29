import { InMemoryUserRepository } from '../../../infrastructure/InMemoryUserRepository';
import { UpdateUser } from '../UpdateUser';
import { User } from '../../entities';
import { TodoRepository, UserRepository } from '../../repositories';
import { InMemoryTodoRepository } from '../../../infrastructure/InMemoryTodoRepository';

describe('UpdateUser', () => {
    let userRepository: UserRepository;
    let updateUser: UpdateUser;
    let todoRepository: TodoRepository;

    beforeEach(() => {
        todoRepository = new InMemoryTodoRepository()
        userRepository = new InMemoryUserRepository(todoRepository);
        updateUser = new UpdateUser(userRepository);
    });

    it('should update an existing user', async () => {
        const user = await userRepository.add({
            authId: '12345',
        });
        if (user instanceof User) {
            const updatedUser = await updateUser.execute({ ...user, authId: '67890' });
            if(updatedUser instanceof User){
                expect(updatedUser.id).toBe(user.id);
                expect(updatedUser.authId).toBe('67890');
            }
        }

    });

    it('should return null if user is not found', async () => {
        const user = {
            id: 'non-existing-id',
            authId: '12345',
            todos: [],
        };
        const updatedUser = await updateUser.execute(user);
        if(updatedUser instanceof Error){
            expect(updatedUser).toBeNull();
        }
        
    });
});
