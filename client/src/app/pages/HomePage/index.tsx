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
import { ReactiveState, useSingleQuery, useState } from '@/utils/ReactUtils';
import { Text } from '@/app/components/Text';
import { SearchBar } from '@/app/components/SearchBar';
import { devices } from '@/utils/deviceUtils';
import { Div } from '@/app/components/Div';
import { PlusIcon } from '@/app/components/icons';
import { useEffect } from 'react';

export function HomePage() {
  const shouldWait = useState(true);
  const searchText = useState('');
  let { data, refetch } = useSingleQuery(
    new GqlBuilder<Property>(PropertyOperation.Get)
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

  const toggleNewPropModal = useState(false);
  const newProp = useState({
    createdAt: new Date(),
    updatedAt: new Date(),
    id: -1,
    title: 'bonjour' + Math.random(),
    description: Math.random().toString(),
    address: {
      city: Math.random().toString(),
      street: Math.random().toString(),
      zip: Math.random().toString(),
      country: Math.random().toString(),
    },
    floor: Math.random() * 100,
    nbRooms: Math.random() * 100,
    surface: Math.random() * 100,
    rentPerMonth: Math.random() * 100,
    landlord: Math.random().toString(),
    isReserved: false,
    reservedBy: Math.random().toString(),
  });
  const createNewProperty = async () => {
    toggleNewPropModal.state = true;
  };

  // used as a loading screen, making sure CSS transitions are applied
  useEffect(() => {
    setTimeout(
      () => {
        shouldWait.state = false;
      },
       1500,
    );
  }, [shouldWait, data]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content={`${Config.projectName} dashboard`} />
      </Helmet>
      <NavBar>
        <SearchBar model={searchText} />
      </NavBar>
      <BodyContent>
        <SearchInfo appearIf={searchText.state.length > 0}>
          Results for « {searchText.state} »
        </SearchInfo>
        <AddNewProperty onClick={createNewProperty}>
          <PlusIcon />
        </AddNewProperty>
        {toggleNewPropModal.state && (
          <PropertyCard
            property={newProp.state}
            toggleModal={toggleNewPropModal}
            onPropertyUpdate={onPropertyUpdate}
            />
        )}
        <ProperiesWrapper>
          {(!data || shouldWait.state) &&
            [...Array(10)].map((_, i) => <PropertyCardLoadSkeleton key={i} />)}
          {data &&
            data.map(p => {
              return (
                <PropertyCard
                  key={p.id}
                  property={p}
                  className="property-card"
                  showIf={
                    p.title?.includes(searchText.state) ||
                    p.description?.includes(searchText.state)
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

const Button = styled.button`
  background-color: ${p => p.theme.accentColor};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1em;
  font-size: 1em;
  box-shadow: ${p => p.theme.boxShadowSharp};
`;

const AddNewProperty = styled(Div)`
  width: 3em;
  height: 3em;
  background-color: ${p => p.theme.accentColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  position: fixed;
  right: 30px;
  bottom: 30px;
  box-shadow: ${p => p.theme.boxShadowDiffuse};

  svg {
    fill: ${p => p.theme.contentBackgroundColor};
  }
`;
