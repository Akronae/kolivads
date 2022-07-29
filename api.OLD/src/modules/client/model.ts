import { getModelForClass, Prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Client } from "@/entities/Client";
import { ClientCreateInput, ClientFilterInput, ClientUpdateInput } from "@/modules/client/input";

export const ClientMongooseModel = getModelForClass(Client);

export default class ClientModel {
  async get(filter: ClientFilterInput): Promise<Array<Client>> {
    return ClientMongooseModel.find(filter).lean().exec();
  }

  async getById(_id: ObjectId): Promise<Client | null> {
    return ClientMongooseModel.findById(_id).lean().exec();
  }

  async create(data: ClientCreateInput): Promise<Client> {
    const Client = new ClientMongooseModel(data);

    const c = await Client.save();
    return await this.getById(c._id) as Client;
  }

  async update(filter: ClientFilterInput, update: ClientUpdateInput): Promise<number> {
    return (await ClientMongooseModel.updateMany(filter, update).lean().exec()).n || 0;
  }

  async delete(filter: ClientFilterInput): Promise<number> {
    return (await ClientMongooseModel.deleteMany(filter).lean().exec()).n || 0;
  }
}
