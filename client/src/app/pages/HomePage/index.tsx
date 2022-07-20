import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import {
  PropertyCard,
  PropertyCardLoadSkeleton,
} from '@/app/components/PropertyCard';
import { Config } from '@/config';
import { NavBar } from '@/app/components/NavBar';
import {
  useSingleMutation,
  useSingleQuery,
  useState,
} from '@/utils/ReactUtils';
import { Text } from '@/app/components/Text';
import { SearchBar } from '@/app/components/SearchBar';
import { devices } from '@/utils/deviceUtils';
import { TextIllusatration } from '@/app/components/assets';
import { useEffect } from 'react';
import { Button } from '@/app/components/Button';
import {
  createPropertiesQuery,
  getPropertiesQuery,
  getRandomPropertyTemplate,
  PropertyUpdateInput,
} from '@/services/property';
import { BackgroundIllustration } from '@/app/components/BackgroundIllustration';
import { FixedButton } from '@/app/components/FixedButton';

export function HomePage() {
  const shouldWait = useState(true);
  const searchText = useState('');
  let { data, refetch } = useSingleQuery(getPropertiesQuery);
  const createProperties = useSingleMutation(createPropertiesQuery);
  const toggleNewPropModal = useState(false);

  const newProp = useState({
    createdAt: new Date(),
    updatedAt: new Date(),
    id: -1,
    title: '',
    description: '',
    address: {
      city: '',
      street: '',
      zip: '',
      country: '',
    },
    floor: 1,
    nbRooms: 1,
    surface: 1,
    rentPerMonth: 1,
    landlord: '',
    isReserved: false,
    reservedBy: null,
  });
  const createNewProperty = async () => {
    toggleNewPropModal.state = true;
  };
  const onPropertyUpdate = async () => {
    await refetch();
  };

  const generateRandomProperties = async () => {
    const properties: PropertyUpdateInput[] = [];
    for (let i = 0; i < 10; i++) {
      properties.push(getRandomPropertyTemplate());
    }
    await createProperties({ variables: { data: properties } });
    await refetch();
  };

  // used as a loading screen, making sure CSS transitions are applied
  useEffect(() => {
    setTimeout(() => {
      shouldWait.state = false;
    }, 500);
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
        <FixedButton onClick={createNewProperty} />
        {data?.length === 0 && !shouldWait.state && (
          <BackgroundIllustration
            illustration={<TextIllusatration />}
            text="No properties found. Would you like to generate some ?"
          >
            <Button type="light" onClick={generateRandomProperties}>
              Generate random properties
            </Button>
          </BackgroundIllustration>
        )}
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
            data
              .map(p => {
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
              })
              .reverse()}
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
