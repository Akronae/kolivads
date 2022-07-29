import { Module } from '@nestjs/common';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { ObjectId } from 'mongodb';

import { modules } from '@/modules';

import { MongoObjectIdScalar } from '@/utils/MongoObjectIdScalar';

@Module({
  imports: [
    TypeGraphQLModule.forRoot({
      validate: false,
      // resolvers,
      scalarsMap: [{ type: ObjectId, scalar: MongoObjectIdScalar }],
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
