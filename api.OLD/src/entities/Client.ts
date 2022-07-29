import { Address } from "@/entities/Address";
import { AutoIncrementID } from "@typegoose/auto-increment";
import { plugin, prop } from "@typegoose/typegoose";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@plugin(AutoIncrementID)
@ObjectType()
export class Client {
  // default MongoDB ID field, cannot be changed.
  @prop()
  readonly _id!: number;

  // publicly available ID field.
  @Field()
  get id(): number {
    return this._id;
  }

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
