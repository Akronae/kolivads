import { Client, ClientOperation } from '@/types/Client';
import ArrayUtils from '@/utils/ArrayUtils';
import GqlBuilder, { GqlVariable, RequestType } from '@/utils/GqlBuilder';
import nameof from 'ts-nameof.macro';

export interface ClientFilterInput {
  id?: number;
}

export interface ClientUpdateInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}
export const getClientsQuery = new GqlBuilder<
  Client,
  { filter?: ClientFilterInput }
>(ClientOperation.Get)
  .addArgument('filter', new GqlVariable('filter', nameof<ClientFilterInput>()))
  .select(s => s.id)
  .select(s => s.firstName)
  .select(s => s.lastName)
  .select(s => s.email)
  .select(s => s.phone);

export const updateClientsQuery = new GqlBuilder<
  Client,
  { filter?: ClientFilterInput; update: ClientUpdateInput }
>(ClientOperation.Update, RequestType.Mutation)
  .addArgument('filter', new GqlVariable('filter', 'ClientFilterInput'))
  .addArgument('update', new GqlVariable('update', 'ClientUpdateInput'));

export const createClientsQuery = new GqlBuilder<
  Client,
  { data: ClientUpdateInput[] }
>(ClientOperation.Create, RequestType.Mutation)
  .addArgument('data', new GqlVariable('data', '[ClientCreateInput!]!'))
  .select(p => p.id);

export const deleteClientsQuery = new GqlBuilder<
  Client,
  { filter: ClientFilterInput }
>(ClientOperation.Delete, RequestType.Mutation).addArgument(
  'filter',
  new GqlVariable('filter', 'ClientFilterInput'),
);

export function getRandomClientTemplate(): ClientUpdateInput {
  const firstName = ArrayUtils.getRandomElement([
    'John',
    'Jane',
    'Mary',
    'Bob',
    'Tom',
    'Jack',
    'Peter',
    'Paul',
    'Mary',
  ]);
  const lastName = ArrayUtils.getRandomElement([
    'Smith',
    'Jones',
    'Williams',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
  ]);
  return {
    firstName,
    lastName,
    email: (
      `${firstName}.${lastName}${Math.ceil(Math.random() * 100)}@` +
      ArrayUtils.getRandomElement(['gmail.com', 'yahoo.com', 'hotmail.com'])
    ).toLowerCase(),
    phone:
      '06' +
      Array(8)
        .fill(0)
        .map(() => Math.round(Math.random() * 9))
        .join(''),
  };
}
