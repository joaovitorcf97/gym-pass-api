import { UsersRepository } from '@/repositories/prisma/contracts/users-repositories';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resoure-not-found-error';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfilUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfilUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
