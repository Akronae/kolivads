import { prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";

@InputType("AddressInput")
@ObjectType()
export class Address {
  @prop()
  @Field()
  street!: string;

  @prop()
  @Field()
  city!: string;
  
  @prop()
  @Field()
  zip!: string;
  
  @prop()
  @Field()
  country!: string;
}
