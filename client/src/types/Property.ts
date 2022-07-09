export interface Property {
  id: number;
  createdAt: Date;
  landlord: string;
  updatedAt: Date;
  floor: number;
  surface: number;
  description: string;
  title: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  rentPerMonth: number;
  nbRooms: number;
}

export enum PropertyOperation {
  Get = 'getProperties',
  Create = 'createProperties',
  Delete = 'deleteProperties',
}
