import { CheckInsRepository } from '@/repositories/prisma/contracts/check-ins-repository';
import { CheckIn } from '@prisma/client';
import dayjs from 'dayjs';
import { LateCheckInValidationErrors } from './errors/late-check-in-validation-error';
import { ResourceNotFoundError } from './errors/resoure-not-found-error';

interface ValidateCheckinUseCaseRequest {
  checkinId: string;
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckinUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkinId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkinId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distaceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes'
    );

    if (distaceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationErrors();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
