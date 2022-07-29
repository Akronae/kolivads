import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongooseBootstrapper from '@/bootstrap/mongoose';
import * as chalk from 'chalk';
import { config } from '@/config';

async function bootstrap() {
  await mongooseBootstrapper();
  const app = await NestFactory.create(AppModule);
  await app.listen(config.port);
  const listenAddr = 'http://localhost:' + config.port;
  Logger.log(`✨ Server listening at ${chalk.yellow(listenAddr)}`, 'Bootstrap');
  Logger.log(
    `🕸 GraphQL Playground at ${chalk.yellow(listenAddr + '/graphql')}`,
    'Bootstrap',
  );
}
bootstrap();
