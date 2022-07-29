import { Type } from '@nestjs/common';
import AuthModule from './auth/module';
import ClientModule from './client/module';
import PropertyModule from './property/module';
import { NonEmptyArray } from 'type-graphql';

export const modules: NonEmptyArray<Type<any>> = [
  ClientModule,
  PropertyModule,
  AuthModule,
];
