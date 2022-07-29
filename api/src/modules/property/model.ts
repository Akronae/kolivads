import { getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';

import { Property } from '@/entities/Property';
import {
  PropertyCreateInput,
  PropertyFilterInput,
  PropertyUpdateInput,
} from '@/modules/property/input';

export const PropertyMongooseModel = getModelForClass(Property);

export default class PropertyModel {
  async get(filter: PropertyFilterInput): Promise<Array<Property>> {
    return PropertyMongooseModel.find(filter).lean().exec();
  }

  async getById(_id: ObjectId | number): Promise<Property | null> {
    return PropertyMongooseModel.findById(_id).lean().exec();
  }

  async create(data: PropertyCreateInput): Promise<Property> {
    const Property = new PropertyMongooseModel(data);

    const prop = await Property.save();
    return (await this.getById(prop._id)) as Property;
  }

  async update(
    filter: PropertyFilterInput,
    update: PropertyUpdateInput,
  ): Promise<number> {
    return (
      (await PropertyMongooseModel.updateMany(filter, update).lean().exec())
        .modifiedCount || 0
    );
  }

  async delete(filter: PropertyFilterInput): Promise<number> {
    return (
      (await PropertyMongooseModel.deleteMany(filter).lean().exec())
        .deletedCount || 0
    );
  }
}
