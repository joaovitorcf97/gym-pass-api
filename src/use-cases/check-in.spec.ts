import { InMemorycheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckinUseCase } from './checkin';

let checkInsRepository: InMemorycheckInsRepository;
let sut: CheckinUseCase;

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemorycheckInsRepository();
    sut = new CheckinUseCase(checkInsRepository);
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
