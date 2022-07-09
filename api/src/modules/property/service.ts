import { Service } from "typedi";
import { ObjectId } from "mongodb";

import PropertyModel from "./model";
import { PropertyCreateInput, PropertyFilterInput } from "./input";
import { Property } from "../../entities/Property";

@Service()
export default class PropertyService {
  constructor(private readonly propertyModel: PropertyModel) {}

  public async getAll(): Promise<Array<Property>> {
    return this.propertyModel.getAll();
  }

  public async getProperties(filter: PropertyFilterInput): Promise<Property[]> {
    return this.propertyModel.getProperties(filter);
  }

  public async getById(_id: ObjectId): Promise<Property | null> {
    return this.propertyModel.getById(_id);
  }

  public async addProperty(data: PropertyCreateInput): Promise<Property> {
    const newProperty = await this.propertyModel.create(data);

    return newProperty;
  }

  public async deleteAll(filter: PropertyFilterInput): Promise<number> {
    return await this.propertyModel.deleteAll(filter);
  }
}
