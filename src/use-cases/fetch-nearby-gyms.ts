import { GymRepository } from '@/repositories/prisma/contracts/gym-respository';
import { Gym } from '@prisma/client';

interface FetchNearbGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbGymsUseCaseRequest): Promise<FetchNearbGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
