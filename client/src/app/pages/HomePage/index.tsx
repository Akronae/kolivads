import { Property, PropertyOperation } from '@/types/Property';
import GqlBuilder from '@/utils/GqlBuilder';
import { useQuery } from '@apollo/client';
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
  const { data } = useSingleQuery(
    useQuery,
    new GqlBuilder<Property>(PropertyOperation.Get)
      .select(s => s.id)
      .select(s => s.title)
      .select(s => s.description)
      .select(s => s.address.city)
      .select(s => s.address.street),
  );
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content={`${Config.projectName} dashboard`} />
      </Helmet>
      <NavBar>
        <SearchBar model={setSearchText} />
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
              return (
                <PropertyCard
                  key={p.id}
                  property={p}
                  className="property-card"
                  showIf={
                    p.title.includes(searchText) ||
                    p.description.includes(searchText)
                  }
                  onClick={() => console.log('loll!!!!!')}
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
