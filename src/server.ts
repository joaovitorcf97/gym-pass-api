import { app } from '@/app';
import { env } from '@/env';

app
  .listen({ host: env.HOST, port: env.PORT })
  .then(() =>
    console.log(`🚀 server is running in http://${env.HOST}:${env.PORT}`)
  );
