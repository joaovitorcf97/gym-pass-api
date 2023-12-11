import { PrismaCheckInsRepositor } from '@/repositories/prisma/prisma-check-ins-repository';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CheckinUseCase } from '../check-in';

export function makeCheckinUseCase() {
  const checkInsRepository = new PrismaCheckInsRepositor();
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CheckinUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
