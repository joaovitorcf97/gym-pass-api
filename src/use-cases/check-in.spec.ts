import { InMemorycheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckinUseCase } from './check-in';

let checkInsRepository: InMemorycheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckinUseCase;

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemorycheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckinUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-19.4655691),
      longitude: new Decimal(-42.5672312),
    });

    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.4655691,
      userLongitude: -42.5672312,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.4655691,
      userLongitude: -42.5672312,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -19.4655691,
        userLongitude: -42.5672312,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.4655691,
      userLongitude: -42.5672312,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.4655691,
      userLongitude: -42.5672312,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be ble to ckech in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-19.4646391),
      longitude: new Decimal(-42.5663901),
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -19.4655691,
        userLongitude: -42.5672312,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
