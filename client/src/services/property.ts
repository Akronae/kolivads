import { Address } from '@/types/Address';
import { Property, PropertyOperation } from '@/types/Property';
import GqlBuilder, { GqlVariable, RequestType } from '@/utils/GqlBuilder';
import nameof from 'ts-nameof.macro';

export interface PropertyFilterInput {
  id?: number;
  title?: string;
}

export interface PropertyUpdateInput {
  floor: number;
  surface: number;
  description: string;
  title: string;
  address: Address;
  rentPerMonth: number;
  landlord: string;
  nbRooms: number;
}
export const getPropertiesQuery = new GqlBuilder<Property>(
  PropertyOperation.Get,
)
  .addArgument(
    'filter',
    new GqlVariable('filter', nameof<PropertyFilterInput>()),
  )
  .select(s => s.id)
  .select(s => s.title)
  .select(s => s.description)
  .select(s => s.floor)
  .select(s => s.nbRooms)
  .select(s => s.surface)
  .select(s => s.rentPerMonth)
  .select(s => s.landlord)
  .select(s => s.address!.city)
  .select(s => s.address!.street)
  .select(s => s.address!.zip)
  .select(s => s.address!.country);

export const updatePropertiesQuery = new GqlBuilder<Property>(
  PropertyOperation.Update,
  RequestType.Mutation,
)
  .addArgument('filter', new GqlVariable('filter', 'PropertyFilterInput'))
  .addArgument('update', new GqlVariable('update', 'PropertyUpdateInput'))
  .build();

export const createPropertiesQuery = new GqlBuilder<Property>(
  PropertyOperation.Create,
  RequestType.Mutation,
)
  .addArgument('data', new GqlVariable('data', 'PropertyCreateInput!'))
  .select(p => p.id)
  .build();

export const deletePropertiesQuery = new GqlBuilder<Property>(
  PropertyOperation.Delete,
  RequestType.Mutation,
)
  .addArgument('filter', new GqlVariable('filter', 'PropertyFilterInput'))
  .build();
