import { Address } from '@/types/Address';
import { Property, PropertyOperation } from '@/types/Property';
import ArrayUtils from '@/utils/ArrayUtils';
import GqlBuilder, { GqlVariable, RequestType } from '@/utils/GqlBuilder';
import nameof from 'ts-nameof.macro';

export interface PropertyFilterInput {
  id?: number;
  title?: string;
}

export interface PropertyUpdateInput {
  floor?: number;
  surface?: number;
  description?: string;
  title?: string;
  address?: Address;
  rentPerMonth?: number;
  landlord?: string;
  nbRooms?: number;
  isReserved?: boolean;
  reservedBy?: number;
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
  .select(s => s.address!.country)
  .select(s => s.reservedBy);

export const updatePropertiesQuery = new GqlBuilder<Property>(
  PropertyOperation.Update,
  RequestType.Mutation,
)
  .addArgument('filter', new GqlVariable('filter', 'PropertyFilterInput'))
  .addArgument('update', new GqlVariable('update', 'PropertyUpdateInput'));

export const createPropertiesQuery = new GqlBuilder<Property>(
  PropertyOperation.Create,
  RequestType.Mutation,
)
  .addArgument('data', new GqlVariable('data', '[PropertyCreateInput!]!'))
  .select(p => p.id);

export const deletePropertiesQuery = new GqlBuilder<Property>(
  PropertyOperation.Delete,
  RequestType.Mutation,
).addArgument('filter', new GqlVariable('filter', 'PropertyFilterInput'));

export function getRandomPropertyTemplate(): PropertyUpdateInput {
  return {
    title: ArrayUtils.getRandomElement([
      'Location appartement meublé',
      'Location appartement',
      'Achat appartement',
      'Achat studio',
    ]),
    description: ArrayUtils.getRandomElement([
      'Conçu avec soin avec des finitions sur mesure, des meubles tendances et une cuisine entièrement équipée et aménagée, vous vous sentirez vraiment chez vous dans cet appartement Blueground. Profitez d’un moment de détente dans votre salon avec nos TV connectée ou nos enceintes Marshall wifi, ou d’un peu de repos bien mérité sur nos matelas haut de gamme! Vous tomberez amoureux de cet appartement situé à Saint Germain des Pres.',
      'Des meubles tendances, une cuisine entièrement équipée, une TV connectée et des enceintes Marshall Wifi: voici quelques-uns des équipements que vous trouverez dans ce 2 pièces. Chaque chambre Blueground est équipée de matelas de qualité supérieure, et de linge de maison haut de gamme. Nous nous occupons de tout pour que vous puissiez démarrer votre nouvelle vie parisienne clef en main!',
      "Venez vite découvrir ce lumineux F3 traversant avec un fort potentiel. Il est composé d'une entrée, un séjour avec une vue dégagée et sans vis-à-vis, une cuisine aménagée, deux chambres, un cagibi, une salle d'eau et des WC séparés.",
    ]),
    address: {
      city: ArrayUtils.getRandomElement([
        'Paris',
        'Lyon',
        'Marseille',
        'Toulouse',
        'Nice',
        'Montpellier',
        'Nantes',
      ]),
      street:
        Math.round(1 + Math.random() * 100) +
        ' ' +
        ArrayUtils.getRandomElement([
          'Rue de la paix',
          'Boulevard Anatole France',
          'Avenue de la République',
          'Boulevard de la République',
        ]),
      zip: Array(5)
        .fill(0)
        .map(() => Math.round(1 + Math.random() * 9))
        .join(''),
      country: 'France',
    },
    floor: Math.round(1 + Math.random() * 10),
    nbRooms: Math.round(1 + Math.random() * 5),
    surface: Math.round(1 + Math.random() * 100),
    rentPerMonth: Math.round(Math.random() * 5000),
    landlord:
      ArrayUtils.getRandomElement([
        'Laurent',
        'Pierre',
        'Paul',
        'Jacques',
        'Jean',
        'Alain',
        'Nathalie',
        'Jeanne',
        'Marie',
      ]) +
      ' ' +
      ArrayUtils.getRandomElement([
        'Dupont',
        'Martin',
        'Robert',
        'Dubois',
        'Moreau',
        'Lepine',
        'Leroy',
        'Giraud',
        'Garcia',
      ]),
  };
}
