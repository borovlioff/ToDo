import { User } from '../entities';
import { NewUser } from '../entities/User';
import { UserRepository } from '../repositories';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(newUser:NewUser): Promise<User|Error> {
    return await this.userRepository.add(newUser);
  }
}