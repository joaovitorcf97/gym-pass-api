import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -19.4655691,
      longitude: -42.5672312,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -19.557756,
      longitude: -42.675523,
    });

    const { gyms } = await sut.execute({
      userLatitude: -19.4655691,
      userLongitude: -42.5672312,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
