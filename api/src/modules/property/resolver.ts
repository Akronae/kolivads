import { Resolver, Arg, Query, Mutation, ID } from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";

import PropertyService from "./service";
import { PropertyCreateInput, PropertyFilterInput } from "./input";
import { Property } from "../../entities/Property";

@Service()
@Resolver((of) => Property)
export default class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query((returns) => [Property])
  async getProperties(
    @Arg("filter", { nullable: true }) filter: PropertyFilterInput
  ) {
    return await this.propertyService.getProperties(filter);
  }

  @Mutation((returns) => Property)
  async createProperty(
    @Arg("data") data: PropertyCreateInput
  ): Promise<Property> {
    return await this.propertyService.addProperty(data);
  }

  @Mutation((returns) => Number)
  async deleteProperties(
    @Arg("filter", { nullable: true }) filter: PropertyFilterInput
  ): Promise<number> {
    return await this.propertyService.deleteAll(filter);
  }
}
