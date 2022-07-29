import { Property } from '@/entities/Property';
import {
  PropertyCreateInput,
  PropertyFilterInput,
  PropertyUpdateInput,
} from '@/modules/property/input';
import PropertyModel from '@/modules/property/model';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PropertyService {
  constructor(private readonly propertyModel: PropertyModel) {}

  public async get(filter: PropertyFilterInput): Promise<Property[]> {
    return this.propertyModel.get(filter);
  }

  public async getById(_id: ObjectId): Promise<Property | null> {
    return this.propertyModel.getById(_id);
  }

  public async add(data: PropertyCreateInput[]): Promise<Property[]> {
    const newProperties = [];

    for (const property of data) {
      newProperties.push(await this.propertyModel.create(property));
    }

    return newProperties;
  }

  public async update(
    filter: PropertyFilterInput,
    update: PropertyUpdateInput,
  ): Promise<number> {
    return await this.propertyModel.update(filter, update);
  }

  public async delete(filter: PropertyFilterInput): Promise<number> {
    return await this.propertyModel.delete(filter);
  }
}
