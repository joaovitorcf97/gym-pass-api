import { Prisma, User } from '.prisma/client';
import { prisma } from '@/lib/prisma';
import { UsersRepository } from './contracts/users-repositories';

export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }
}
