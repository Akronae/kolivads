import { Type } from '@nestjs/common';
import AuthModule from '@/modules/auth/module';
import ClientModule from '@/modules/client/module';
import PropertyModule from '@/modules/property/module';
import { NonEmptyArray } from 'type-graphql';

export const modules: NonEmptyArray<Type<any>> = [
  ClientModule,
  PropertyModule,
  AuthModule,
];
