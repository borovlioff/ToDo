import { User } from '../entities';
import { UserRepository } from '../repositories';

export class GetUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<User|null|Error> {
    return await this.userRepository.getById(userId);
  }
}