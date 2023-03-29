import { User } from '../entities';
import { UserRepository } from '../repositories';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User|Error> {
    return await this.userRepository.update(user);
  }
}