import { InMemorycheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { LateCheckInValidationErrors } from './errors/late-check-in-validation-error';
import { ResourceNotFoundError } from './errors/resoure-not-found-error';
import { ValidateCheckinUseCase } from './validate-check-in';

let checkInsRepository: InMemorycheckInsRepository;
let sut: ValidateCheckinUseCase;

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemorycheckInsRepository();

    sut = new ValidateCheckinUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createCheckIn = await checkInsRepository.create({
      gym_id: 'gym-o1',
      user_id: 'user-01',
    });

    const { checkIn } = await sut.execute({
      checkinId: createCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkinId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkinId: 'inexistent-check-in-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should be able to validate the check-in', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createCheckIn = await checkInsRepository.create({
      gym_id: 'gym-o1',
      user_id: 'user-01',
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutesInMs);

    expect(() =>
      sut.execute({
        checkinId: createCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationErrors);
  });
});
