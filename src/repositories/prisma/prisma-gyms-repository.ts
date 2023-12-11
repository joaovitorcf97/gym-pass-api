import { prisma } from '@/lib/prisma';
import { Gym, Prisma } from '@prisma/client';
import {
  FindManyNearbyParams,
  GymRepository,
} from './contracts/gym-respository';

export class PrismaGymsRepository implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gyms = await prisma.gym.findUnique({
      where: { id },
    });

    return gyms;
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`;

    return gyms;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({ data });

    return gym;
  }
}
