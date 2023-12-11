import { PrismaCheckInsRepositor } from '@/repositories/prisma/prisma-check-ins-repository';
import { ValidateCheckinUseCase } from '../validate-check-in';

export function makeValidateCheckinUseCase() {
  const checkInsRepository = new PrismaCheckInsRepositor();
  const useCase = new ValidateCheckinUseCase(checkInsRepository);

  return useCase;
}
