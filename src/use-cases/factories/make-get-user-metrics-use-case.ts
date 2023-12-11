import { PrismaCheckInsRepositor } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsUseCase } from '../get-user-metrics';

export function makeGetUserMetricsUseCase() {
  const checkinsRepository = new PrismaCheckInsRepositor();
  const useCase = new GetUserMetricsUseCase(checkinsRepository);

  return useCase;
}
