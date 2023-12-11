import { makeGetProfileUseCase } from '@/use-cases/factories/make-user-profile-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  // try {
  //   const authenticateUseCase = makeAuthenticateUseCase();

  //   await authenticateUseCase.execute({ email, password });
  // } catch (error) {
  //   if (error instanceof InvalidCredentialsErrors) {
  //     return reply.status(400).send({ message: error.message });
  //   }

  //   throw error;
  // }

  return reply
    .status(200)
    .send({ user: { ...user, password_hash: undefined } });
}
