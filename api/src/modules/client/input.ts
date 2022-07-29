import { Address } from '@/entities/Address';
import { prop } from '@typegoose/typegoose';
import { IsEmail, IsPhoneNumber, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ClientCreateInput {
  @prop()
  @Field()
  firstName!: string;

  @prop()
  @Field()
  lastName!: string;

  @prop()
  @Field()
  @IsEmail()
  email!: string;

  @prop()
  @Field()
  @IsPhoneNumber('FR')
  phone!: string;
}

@InputType()
export class ClientUpdateInput {
  @prop()
  @Field({ nullable: true })
  firstName?: string;

  @prop()
  @Field({ nullable: true })
  lastName?: string;

  @prop()
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @prop()
  @Field({ nullable: true })
  @IsPhoneNumber('FR')
  phone?: string;
}

@InputType()
export class ClientFilterInput {
  @prop()
  @Field({ nullable: true })
  id?: number;

  @prop()
  @Field({ nullable: true })
  firstName?: string;

  @prop()
  @Field({ nullable: true })
  lastName?: string;

  @prop()
  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @prop()
  @Field({ nullable: true })
  @IsPhoneNumber('FR')
  phone?: string;
}
