require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';


async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.enableCors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5173/*", "http://127.0.0.1:5173/*"] });

  app.getHttpAdapter().getInstance().addHook('onRequest', (request, reply, done) => {
    reply.setHeader = function (key, value) {
      return this.raw.setHeader(key, value)
    }
    reply.end = function () {
      this.raw.end()
    }
    request.res = reply
    done()
  });

  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
