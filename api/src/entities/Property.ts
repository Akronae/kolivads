import { Address } from '@/entities/Address';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { plugin, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@plugin(AutoIncrementID)
@ObjectType()
export class Property {
  // default MongoDB ID field, cannot be changed.
  @prop()
  readonly _id!: number;

  // publicly available ID field.
  @Field()
  get id(): number {
    return this._id;
  }

  @prop()
  @Field(() => Date)
  createdAt!: Date;

  @prop()
  @Field(() => Date)
  updatedAt!: Date;

  @prop()
  @Field()
  landlord!: string;

  @prop({ min: 0 })
  @Field()
  floor!: number;

  @prop({ min: 1 })
  @Field()
  surface!: number;

  @prop({ trim: true })
  @Field()
  description!: string;

  @prop({ trim: true })
  @Field()
  title!: string;

  @prop()
  @Field((_type) => Address)
  address!: Address;

  @prop({ min: 1 })
  @Field()
  rentPerMonth: number;

  @prop({ min: 1 })
  @Field()
  nbRooms: number;

  @Field()
  get isReserved(): boolean {
    return this.reservedBy != undefined && this.reservedBy >= 0;
  }
  set isReserved(val: boolean) {
    if (!val) this.reservedBy = undefined;
  }

  @prop()
  @Field({ nullable: true })
  reservedBy?: number;
}
