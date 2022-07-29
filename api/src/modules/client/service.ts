import { Client } from '@/entities/Client';
import {
  ClientCreateInput,
  ClientFilterInput,
  ClientUpdateInput,
} from '@/modules/client/input';
import ClientModel from '@/modules/client/model';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ClientService {
  constructor(private readonly clientModel: ClientModel) {}

  public async get(filter: ClientFilterInput): Promise<Client[]> {
    return this.clientModel.get(filter);
  }

  public async getById(_id: ObjectId | number): Promise<Client | null> {
    return this.clientModel.getById(_id);
  }

  public async add(data: ClientCreateInput[]): Promise<Client[]> {
    const newProperties = [];

    for (const client of data) {
      newProperties.push(await this.clientModel.create(client));
    }

    return newProperties;
  }

  public async update(
    filter: ClientFilterInput,
    update: ClientUpdateInput,
  ): Promise<number> {
    return await this.clientModel.update(filter, update);
  }

  public async delete(filter: ClientFilterInput): Promise<number> {
    return await this.clientModel.delete(filter);
  }
}
