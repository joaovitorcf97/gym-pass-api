import { UsersRepository } from '@/repositories/prisma/contracts/users-repositories';
import { hash } from 'bcryptjs';
import { UserAlredyExistsError } from './errors/user-alredy-exists-error';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlredyExistsError();
    }

    await this.usersRepository.create({ name, email, password_hash });
  }
}
