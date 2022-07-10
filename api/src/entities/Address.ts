import { ObjectType, Field, InputType } from "type-graphql";
import { prop } from "@typegoose/typegoose";

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
