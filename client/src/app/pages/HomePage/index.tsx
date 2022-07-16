import { Property, PropertyOperation } from '@/types/Property';
import GqlBuilder, { GqlVariable, RequestType } from '@/utils/GqlBuilder';
import { useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import {
  PropertyCard,
  PropertyCardLoadSkeleton,
} from '@/app/components/PropertyCard';
import { Config } from '@/config';
import { NavBar } from '@/app/components/NavBar';
import { useState } from 'react';
import { useSingleQuery } from '@/utils/ReactUtils';
import { Text } from '@/app/components/Text';
import { SearchBar } from '@/app/components/SearchBar';
import { devices } from '@/utils/deviceUtils';

export function HomePage() {
  const [searchText, setSearchText] = useState('');
  const { data, refetch } = useSingleQuery(
    new GqlBuilder<Property>(PropertyOperation.Get)
      .select(s => s.id)
      .select(s => s.title)
      .select(s => s.description)
      .select(s => s.floor)
      .select(s => s.nbRooms)
      .select(s => s.surface)
      .select(s => s.rentPerMonth)
      .select(s => s.address!.city)
      .select(s => s.address!.street)
      .select(s => s.address!.zip)
      .select(s => s.address!.country),
  );
  const [savePropertyChanges] = useMutation(
    new GqlBuilder<Property>(PropertyOperation.Update, RequestType.Mutation)
      .addArgument('filter', new GqlVariable('filter', 'PropertyFilterInput'))
      .addArgument('update', new GqlVariable('update', 'PropertyUpdateInput'))
      .build(),
  );
  const onPropertyUpdate = async (property: Property) => {
    await savePropertyChanges({
      variables: {
        filter: { id: property.id },
        update: {
          title: property.title,
          description: property.description,
          floor: property.floor,
          nbRooms: property.nbRooms,
          surface: property.surface,
          rentPerMonth: property.rentPerMonth,
          address: {
            city: property.address!.city,
            street: property.address!.street,
            zip: property.address!.zip,
            country: property.address!.country,
          },
        },
      },
    });
    await refetch();
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content={`${Config.projectName} dashboard`} />
      </Helmet>
      <NavBar>
        <SearchBar model={[searchText, setSearchText]} />
      </NavBar>
      <BodyContent>
        <SearchInfo appearIff={searchText.length > 0}>
          Results for « {searchText} »
        </SearchInfo>
        <ProperiesWrapper>
          {!data &&
            [...Array(10)].map((_, i) => <PropertyCardLoadSkeleton key={i} />)}
          {data &&
            data.map(p => {
              console.log('rendering', p);
              return (
                <PropertyCard
                  key={p.id}
                  property={p}
                  className="property-card"
                  showIf={
                    p.title?.includes(searchText) ||
                    p.description?.includes(searchText)
                  }
                  onPropertyUpdate={onPropertyUpdate}
                />
              );
            })}
        </ProperiesWrapper>
      </BodyContent>
    </>
  );
}

const BodyContent = styled.div`
  padding: calc(${p => p.theme.navBarHeight} + 2em) ${p => p.theme.appPadding};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchInfo = styled(Text)`
  font-weight: bold;
  color: ${p => p.theme.textColorLight};
  margin-bottom: 0.7em;
`;

const ProperiesWrapper = styled.div`
  display: grid;
  grid-row-gap: 2em;
  justify-items: center;
  grid-column-gap: 1.5em;
  grid-template-columns: repeat(1, 1fr);

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${devices.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${devices.desktopL} {
    grid-template-columns: repeat(5, 1fr);
  }

  .property-card {
    width: 100%;
  }
`;
