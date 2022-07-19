import { Address } from './Address';

export interface Property {
  id: number;
  createdAt: Date;
  landlord: string;
  updatedAt: Date;
  floor: number;
  surface: number;
  description: string;
  title: string;
  address: Address;
  rentPerMonth: number;
  nbRooms: number;
  isReserved: boolean;
  reservedBy: string;
}

export enum PropertyOperation {
  Get = 'getProperties',
  Create = 'createProperty',
  Update = 'updateProperties',
  Delete = 'deleteProperties',
}
