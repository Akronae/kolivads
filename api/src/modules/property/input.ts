import { Field, InputType, ID } from "type-graphql";
import { MaxLength, Min, MinLength } from "class-validator";
import { Address } from "../../entities/Address";
import { prop } from "@typegoose/typegoose";

@InputType()
export class PropertyCreateInput {
  @Field()
  @Min(0)
  floor!: number;

  @Field()
  @Min(1)
  surface!: number;

  @Field()
  description!: string;

  @Field()
  title!: string;

  @Field(type => Address)
  address!: Address;

  @Field()
  rentPerMonth: number;

  @Field()
  nbRooms: number;
}

@InputType()
export class PropertyFilterInput {
  @prop()
  _id: number;

  @Field({ nullable: true })
  get id (): number {
    return this._id;
  }
  set id (value: number) {
    this._id = value;
  }

  @Field({ nullable: true })
  title: string;
}
