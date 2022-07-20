import { TextIllusatration } from '@/app/components/assets';
import { BackgroundIllustration } from '@/app/components/BackgroundIllustration';
import { Button } from '@/app/components/Button';
import { ClientCard } from '@/app/components/ClientCard';
import { FixedButton } from '@/app/components/FixedButton';
import { NavBar } from '@/app/components/NavBar';
import {
  createClientsQuery,
  getClientsQuery,
  getRandomClientTemplate,
} from '@/services/client';
import { Client } from '@/types/Client';
import ObjectUtils from '@/utils/ObjectUtils';
import {
  useSingleMutation,
  useSingleQuery,
  useState,
} from '@/utils/ReactUtils';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

export interface PageParams {}
export function Clients() {
  const { data, refetch } = useSingleQuery(getClientsQuery);
  const createClients = useSingleMutation(createClientsQuery);
  const toggleNewClient = useState(false);

  const onClientUpdated = async (client: Client | null) => {
    toggleNewClient.state = false;
    refetch();
  };

  const generateRandomClients = async () => {
    await createClients({
      variables: { data: [...Array(6)].map(() => getRandomClientTemplate()) },
    });
    await refetch();
  };

  const createNewClient = async () => {
    toggleNewClient.state = true;
  };

  return (
    <>
      <Helmet>
        <title>Clients</title>
        <meta name="description" content={`clients page`} />
      </Helmet>
      <NavBar />
      <FixedButton onClick={createNewClient} />
      <BodyContent>
        {toggleNewClient.state && (
          <ClientCard
            client={{
              email: '',
              firstName: '',
              lastName: '',
              id: -1,
              phone: '',
            }}
            onUpdated={onClientUpdated}
            editMode={true}
          />
        )}
        {data && data.length === 0 && (
          <BackgroundIllustration
            illustration={<TextIllusatration />}
            text="No client found. Would you like to generate some?"
          >
            <Button type="light" onClick={generateRandomClients}>
              Generate random clients
            </Button>
          </BackgroundIllustration>
        )}
        {data &&
          data
            .map(c => (
              <ClientCard
                client={ObjectUtils.clone(c)}
                key={c.id}
                onUpdated={onClientUpdated}
              />
            ))
            .reverse()}
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
