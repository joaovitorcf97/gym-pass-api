import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';
import { UserAlredyExistsError } from './errors/user-alredy-exists-error';
import { RegisterUseCase } from './register';

describe('Register UseCase', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    const email = 'john@email.com';

    await registerUseCase.execute({
      name: 'John Doe',
      email: email,
      password: '1234566',
    });

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: email,
        password: '1234566',
      })
    ).rejects.toBeInstanceOf(UserAlredyExistsError);
  });
});
