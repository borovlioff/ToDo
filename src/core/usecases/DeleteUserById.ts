import { UserRepository } from '../repositories';

export class DeleteUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void|Error> {
    await this.userRepository.delete(userId);
  }
}