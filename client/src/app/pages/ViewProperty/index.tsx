import { NavBar } from '@/app/components/NavBar';
import {
  PropertyCard,
  PropertyCardLoadSkeleton,
} from '@/app/components/PropertyCard';
import { Property, PropertyOperation } from '@/types/Property';
import { devices } from '@/utils/deviceUtils';
import GqlBuilder from '@/utils/GqlBuilder';
import { useSingleQuery } from '@/utils/ReactUtils';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export interface PageParams {
  id: string;
}
export function ViewProperty() {
  const { id } = useParams<PageParams>();
  const { data, refetch } = useSingleQuery(
    new GqlBuilder<Property>(PropertyOperation.Get)
      .addArgument('filter', {
        id: Number.parseInt(id),
      })
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
      .select(s => s.address!.country),
  );

  const onPropertyUpdate = async () => {
    await refetch();
  };

  const property = data?.[0];

  return (
    <>
      <Helmet>
        <title>{property?.title}</title>
        <meta
          name="description"
          content={`view ${property?.title} ${property?.title}`}
        />
      </Helmet>
      <NavBar />
      <BodyContent>
        {!property && <PropertyCardLoadSkeleton />}
        {property && (
          <PropertyCard
            property={property}
            onPropertyUpdate={onPropertyUpdate}
            expandInPlace={true}
          />
        )}
      </BodyContent>
    </>
  );
}

const BodyContent = styled.div`
  padding: calc(${p => p.theme.navBarHeight} + 2em) ${p => p.theme.appPadding};
  display: flex;
  flex-direction: column;
  justify-content: center;

  .ExpandableModal {
    margin: auto;

    .body {
      padding-left: 2em;
      padding-right: 2em;
    }

    @media ${devices.laptop} {
      width: 50vw;
    }
  }
`;
