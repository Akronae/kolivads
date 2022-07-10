import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { Service } from "typedi";
import PropertyService from "@/modules/property/service";
import { PropertyCreateInput, PropertyFilterInput } from "@/modules/property/input";
import { Property } from "@/entities/Property";

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
