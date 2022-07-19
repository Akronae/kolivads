export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export enum ClientOperation {
  Get = 'getClients',
  Create = 'createClients',
  Update = 'updateClients',
  Delete = 'deleteClients',
}
