import { Address } from './Address';

export class Property {
  id: number = 0;
  createdAt: Date | undefined = undefined;
  landlord: string | undefined = undefined;
  updatedAt: Date | undefined = undefined;
  floor: number | undefined = undefined;
  surface: number | undefined = undefined;
  description: string | undefined = undefined;
  title: string | undefined = undefined;
  address: Address | undefined = undefined;
  rentPerMonth: number | undefined = undefined;
  nbRooms: number | undefined = undefined;
}

export enum PropertyOperation {
  Get = 'getProperties',
  Create = 'createProperties',
  Update = 'updateProperties',
  Delete = 'deleteProperties',
}
