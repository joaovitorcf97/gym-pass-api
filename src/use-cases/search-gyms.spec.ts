import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -19.4655691,
      longitude: -42.5672312,
    });

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -19.4655691,
      longitude: -42.5672312,
    });

    await gymsRepository.create({
      title: 'PHP Gym',
      description: '',
      phone: '',
      latitude: -19.4655691,
      longitude: -42.5672312,
    });

    const { gyms } = await sut.execute({
      query: 'PHP',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'PHP Gym' })]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: '',
        phone: '',
        latitude: -19.4655691,
        longitude: -42.5672312,
      });
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ]);
  });
});
