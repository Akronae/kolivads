import {
  DefaultProps,
  ReactiveState,
  takeSubState,
  useSingleMutation,
  useState,
  useStateIfDefined,
} from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';
import { Client } from '@/types/Client';
import { Input } from './Input';
import nameof from 'ts-nameof.macro';
import ObjectUtils from '@/utils/ObjectUtils';
import { Button } from './Button';
import { Text } from './Text';
import { TrashIcon } from './assets';
import {
  createClientsQuery,
  deleteClientsQuery,
  updateClientsQuery,
} from '@/services/client';

interface Props extends DefaultProps {
  client: Client;
  onUpdated?: (client: Client | null) => void;
  editMode?: ReactiveState<boolean> | boolean;
}

export function ClientCard(p: Props) {
  const { client, onUpdated, editMode, ...passedProps } = p;

  passedProps.className += ' ClientCard';

  const createClients = useSingleMutation(createClientsQuery);
  const updateClients = useSingleMutation(updateClientsQuery);
  const deleteClients = useSingleMutation(deleteClientsQuery);
  const clientState = useState(ObjectUtils.clone(client));
  const editModeToggled = useStateIfDefined(editMode, false);

  const onEditButtonClick = () => {
    editModeToggled.state = true;
  };

  const onSaveButtonClick = async () => {
    const { email, firstName, lastName, phone } = clientState.state;
    const update = { email, firstName, lastName, phone };
    let updated: Client | null = null;
    if (client.id > 0) {
      updated = (
        await updateClients({
          variables: {
            filter: { id: client.id },
            update,
          },
        })
      )[0];
    } else {
      updated = (
        await createClients({
          variables: {
            data: update,
          },
        })
      )[0];
    }
    onUpdated?.(updated);
    editModeToggled.state = false;
  };

  const onDeleteButtonClick = async () => {
    await deleteClients({ variables: { filter: { id: client.id } } });
    onUpdated?.(client);
  };

  const modelOf = (key: string) => takeSubState(key, clientState);

  return (
    <ClientCardWrapper {...passedProps}>
      {!editModeToggled.state && (
        <Text center={{ vertical: true }}>
          {clientState.state.firstName} {clientState.state.lastName}
          {', '}
          {clientState.state.email}, {clientState.state.phone}
        </Text>
      )}
      {editModeToggled.state && (
        <>
          <Input
            model={modelOf(nameof<Client>(c => c.firstName))}
            label="First Name"
          />
          <Input
            model={modelOf(nameof<Client>(c => c.lastName))}
            label="Last Name"
          />
          <Input model={modelOf(nameof<Client>(c => c.email))} label="Email" />
          <Input model={modelOf(nameof<Client>(c => c.phone))} label="Phone" />
        </>
      )}
      <Div
        showIf={editModeToggled.state}
        className="delete-icon"
        tooltip="delete"
        onClick={onDeleteButtonClick}
      >
        <TrashIcon />
      </Div>
      <Button
        type="light"
        showIf={!editModeToggled.state}
        onClick={onEditButtonClick}
      >
        Edit
      </Button>
      <Button
        type="light"
        showIf={editModeToggled.state}
        onClick={onSaveButtonClick}
      >
        Save
      </Button>
    </ClientCardWrapper>
  );
}

const ClientCardWrapper = styled(Div)`
  padding: 1em;
  background-color: ${p => p.theme.contentBackgroundColor};
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  margin-top: 10px;

  .Text {
  }

  .Button {
    margin-left: auto;
  }

  .Input {
    width: 100%;
    margin-right: 1em;
  }

  .delete-icon {
    min-width: 2em;
    height: 2em;
    margin: auto 1em;
    svg {
      fill: ${p => p.theme.textColor};
    }
  }
`;
