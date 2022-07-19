import { Address } from "@/entities/Address";
import { prop } from "@typegoose/typegoose";
import { Min } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PropertyCreateInput {
  @Field()
  @Min(0)
  floor: number;

  @Field()
  surface: number;

  @Field()
  description: string;

  @Field()
  title: string;

  @Field(type => Address, )
  address: Address;

  @Field()
  rentPerMonth: number;

  @Field()
  landlord: string;

  @Field()
  nbRooms: number;

  @Field()
  isReserved: boolean;

  @Field({ nullable: true })
  reservedBy?: number;
}

@InputType()
export class PropertyUpdateInput {
  @Field({ nullable: true })
  floor?: number;

  @Field({ nullable: true })
  surface?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  title?: string;

  @Field(type => Address, { nullable: true })
  address?: Address;

  @Field({ nullable: true })
  rentPerMonth?: number;

  @Field({ nullable: true })
  landlord?: string;

  @Field({ nullable: true })
  nbRooms?: number;
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
