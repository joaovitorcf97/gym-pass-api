import { Gym } from '@prisma/client';
import { GymRepository } from '../prisma/contracts/gym-respository';

export class InMemoryGymsRepository implements GymRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
