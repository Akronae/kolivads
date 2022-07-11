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
        <ProperiesWrapper className="row">
          <PropertyCardLoadSkeleton />
          <PropertyCardLoadSkeleton />
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
                />
              );
            })}
        </ProperiesWrapper>
      </BodyContent>
    </>
  );
}

const BodyContent = styled.div`
  padding: calc(${p => p.theme.navBarHeight} + 2em) 10em;
`;

const SearchInfo = styled(Text)`
  font-weight: bold;
  color: ${p => p.theme.textColorLight};
`;

const ProperiesWrapper = styled.div`
  flex-flow: wrap;
  justify-content: space-between;

  .property-card {
    margin: 1em 0;
  }
`;
