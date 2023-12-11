import { PrismaCheckInsRepositor } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchMemberCheckInsHistoryUseCase } from '../fetch-member-check-ins-history';

export function makeFetchMemberCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepositor();
  const useCase = new FetchMemberCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
