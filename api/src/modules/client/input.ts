import { prop } from '@typegoose/typegoose';
import { IsEmail, IsPhoneNumber } from 'class-validator';
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
  _id?: number;

  @prop()
  @Field({ nullable: true })
  get id(): number | undefined {
    return this._id;
  }
  set id(value: number | undefined) {
    this._id = value;
  }

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
