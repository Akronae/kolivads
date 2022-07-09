import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Property } from "../../entities/Property";
import { PropertyCreateInput, PropertyFilterInput } from "./input";

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

  async create(data: PropertyCreateInput): Promise<any> {
    const Property = new PropertyMongooseModel(data);

    return Property.save();
  }

  async deleteAll(filter: PropertyFilterInput): Promise<number> {
    return (await PropertyMongooseModel.deleteMany(filter).exec()).n || 0;
  }
}
