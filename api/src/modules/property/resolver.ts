import { Property } from '@/entities/Property';
import {
  PropertyCreateInput,
  PropertyFilterInput,
  PropertyUpdateInput,
} from '@/modules/property/input';
import PropertyService from '@/modules/property/service';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver((of) => Property)
export default class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query((returns) => [Property])
  async getProperties(
    @Arg('filter', { nullable: true }) filter: PropertyFilterInput,
  ) {
    return await this.propertyService.get(filter);
  }

  @Mutation((returns) => [Property])
  async createProperties(
    @Arg('data', (type) => [PropertyCreateInput]) data: PropertyCreateInput[],
  ): Promise<Property[]> {
    return await this.propertyService.add(data);
  }

  @Mutation((returns) => Number)
  async updateProperties(
    @Arg('filter', { nullable: true }) filter: PropertyFilterInput,
    @Arg('update', { nullable: true }) update: PropertyUpdateInput,
  ): Promise<number> {
    return await this.propertyService.update(filter, update);
  }

  @Mutation((returns) => Number)
  async deleteProperties(
    @Arg('filter', { nullable: true }) filter: PropertyFilterInput,
  ): Promise<number> {
    return await this.propertyService.delete(filter);
  }
}
