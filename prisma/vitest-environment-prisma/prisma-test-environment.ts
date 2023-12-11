import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { execSync } from 'node:child_process';
import { Environment } from 'vitest';

const prisma = new PrismaClient();

function randomSchema() {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 30) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomSchema();

    process.env.DATABASE_URL = `mysql://root:523189647@localhost:3306/${schema}`;

    await prisma.$executeRawUnsafe(`CREATE SCHEMA ${schema}`);

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS ${schema}`);
        await prisma.$disconnect();
      },
    };
  },
};
