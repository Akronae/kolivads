import { getModelForClass, Prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Property } from "@/entities/Property";
import { PropertyCreateInput, PropertyFilterInput, PropertyUpdateInput } from "@/modules/property/input";

export const PropertyMongooseModel = getModelForClass(Property);

export default class PropertyModel {
  async getAll(): Promise<Array<Property>> {
    return PropertyMongooseModel.find().lean().exec();
  }

  async getProperties(filter: PropertyFilterInput): Promise<Array<Property>> {
    return PropertyMongooseModel.find(filter).lean().exec();
  }

  async getById(_id: ObjectId): Promise<Property | null> {
    return PropertyMongooseModel.findById(_id).lean().exec();
  }

  async create(data: PropertyCreateInput): Promise<Property> {
    const Property = new PropertyMongooseModel(data);

    const prop = await Property.save();
    return await this.getById(prop._id) as Property;
  }

  async update(filter: PropertyFilterInput, update: PropertyUpdateInput): Promise<number> {
    return (await PropertyMongooseModel.updateMany(filter, update).lean().exec()).n || 0;
  }

  async deleteAll(filter: PropertyFilterInput): Promise<number> {
    return (await PropertyMongooseModel.deleteMany(filter).lean().exec()).n || 0;
  }
}
