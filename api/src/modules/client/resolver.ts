import { Client } from '@/entities/Client';
import {
  ClientCreateInput,
  ClientFilterInput,
  ClientUpdateInput,
} from '@/modules/client/input';
import ClientService from '@/modules/client/service';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver((_of) => Client)
export default class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query((_returns) => [Client])
  async getClients(
    @Arg('filter', { nullable: true }) filter: ClientFilterInput,
  ) {
    return await this.clientService.get(filter);
  }

  @Mutation((_returns) => [Client])
  async createClients(
    @Arg('data', (_type) => [ClientCreateInput]) data: ClientCreateInput[],
  ): Promise<Client[]> {
    return await this.clientService.add(data);
  }

  @Mutation((_returns) => Number)
  async updateClients(
    @Arg('filter', { nullable: true }) filter: ClientFilterInput,
    @Arg('update', { nullable: true }) update: ClientUpdateInput,
  ): Promise<number> {
    return await this.clientService.update(filter, update);
  }

  @Mutation((_returns) => Number)
  async deleteClients(
    @Arg('filter', { nullable: true }) filter: ClientFilterInput,
  ): Promise<number> {
    return await this.clientService.delete(filter);
  }
}
