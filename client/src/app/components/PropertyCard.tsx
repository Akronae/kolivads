import { Property, PropertyOperation } from '@/types/Property';
import {
  DefaultProps,
  ReactiveState,
  takeSubState,
  useSingleMutation,
  useSingleQuery,
  useState,
  useStateIfDefined,
} from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Text } from '@/app/components/Text';
import { Direction, Separator } from '@/app/components/Separator';
import { ExpandableModal } from '@/app/components/ExpandableModal';
import { Div } from './Div';
import { ThemeManager } from '@/styles/theme';
import ContentLoader from 'react-content-loader';
import {
  LocationPinIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@/app/components/assets';
import { Input } from './Input';
import nameof from 'ts-nameof.macro';
import ObjectUtils from '@/utils/ObjectUtils';
import GqlBuilder, { GqlVariable } from '@/utils/GqlBuilder';
import { useHistory } from 'react-router-dom';
import {
  createPropertiesQuery,
  deletePropertiesQuery,
  PropertyFilterInput,
  updatePropertiesQuery,
} from '@/services/property';
import { Client } from '@/types/Client';
import { createClientsQuery, getClientsQuery } from '@/services/client';
import { Button } from './Button';

export interface Props extends DefaultProps {
  property: Property;
  onPropertyUpdate?: (property: Property | null) => void;
  expandInPlace?: boolean;
  toggleModal?: ReactiveState<boolean>;
}

export function PropertyCard(p: Props) {
  let {
    property,
    onPropertyUpdate,
    expandInPlace,
    toggleModal,
    ...passedProps
  } = p;

  const landlordsQuery = useSingleQuery(
    new GqlBuilder<Property>(PropertyOperation.Get)
      .addArgument(
        'filter',
        new GqlVariable('filter', nameof<PropertyFilterInput>()),
      )
      .select(p => p.landlord),
  );
  const updateProperty = useSingleMutation(updatePropertiesQuery);
  const createProperties = useSingleMutation(createPropertiesQuery);
  const deleteProperties = useSingleMutation(deletePropertiesQuery);
  const getClients = useSingleQuery(getClientsQuery);
  const createClients = useSingleMutation(createClientsQuery);
  const [originalPropState, setOriginalPropState] = useState(
    ObjectUtils.clone(property),
  );
  const propState = useState(ObjectUtils.clone(property));
  const reservedBy = useState<string>('');
  const newClient = useState<Client>({
    id: -1,
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  });
  const modalToggled = useStateIfDefined(toggleModal, false);
  const history = useHistory();

  const saveChanges = async () => {
    newClient.state.email = reservedBy.state;
    propState.state.reservedBy =
      getClients.data?.find(c => c.email === reservedBy.state)?.id || -1;

    if (newClient.state.email && !propState.state.reservedBy) {
      const { email, firstName, lastName, phone } = newClient.state;
      const data = [{ email, firstName, lastName, phone }];
      const createdClient = (await createClients({ variables: { data } }))[0];
      propState.state.reservedBy = createdClient.id;
      getClients.refetch();
    }

    const update = {
      title: propState.state.title,
      description: propState.state.description,
      floor: propState.state.floor,
      nbRooms: propState.state.nbRooms,
      surface: propState.state.surface,
      rentPerMonth: propState.state.rentPerMonth,
      landlord: propState.state.landlord,
      address: {
        city: propState.state.address!.city,
        street: propState.state.address!.street,
        zip: propState.state.address!.zip,
        country: propState.state.address!.country,
      },
      reservedBy: propState.state.reservedBy,
    };
    var updated: Property | null = null;

    if (propState.state.id < 0) {
      updated = (await createProperties({ variables: { data: [update] } }))[0];
    } else {
      await updateProperty({
        variables: {
          filter: { id: propState.state.id },
          update,
        },
      });
      updated = propState.state;
    }

    setOriginalPropState(updated!);
    onPropertyUpdate?.(updated!);
    hideModal();
  };

  const deleteCurrentProperty = async () => {
    await deleteProperties({
      variables: { filter: { id: propState.state.id } },
    });
    hideModal();
    onPropertyUpdate?.(null);
    history.push('/');
  };

  const hideModal = () => {
    modalToggled.state = false;
    propState.state = ObjectUtils.clone(originalPropState);
  };

  const modelOf = (key: string) => takeSubState(key, propState);

  if (JSON.stringify(originalPropState) !== JSON.stringify(property)) {
    setOriginalPropState(ObjectUtils.clone(property));
    propState.state = ObjectUtils.clone(property);
  }

  const shouldCreateNewClient =
    !!reservedBy.state &&
    !getClients.data?.some(c => c.email === reservedBy.state);

  const reservedByFromProp = getClients.data?.find(
    c => c.id === propState.state.reservedBy,
  );
  if (!reservedBy.state) reservedBy.state = reservedByFromProp?.email || '';

  return (
    <Card
      {...passedProps}
      toggleModel={modalToggled}
      expandInPlace={expandInPlace}
      previewContent={
        <>
          {property.id >= 0 && (
            <img
              src={`/property-previews/${(propState.state.id % 9) + 1}.jpg`}
              alt="property preview"
            />
          )}
          <div className="body">
            <div className="title">{propState.state.title}</div>
            <Text className="address" leftIcon={<LocationPinIcon />}>
              {propState.state.address?.city}, {propState.state.address?.street}
            </Text>
            <Text className="summup">
              {propState.state.nbRooms} rooms for {propState.state.surface}m² at
              floor {propState.state.floor} for {propState.state.rentPerMonth}
              €/month
            </Text>
            <Text className="description" limit={100}>
              {propState.state.description}
            </Text>
          </div>
        </>
      }
      topActions={
        <>
          <Div
            onClick={deleteCurrentProperty}
            tooltip="delete property"
            showIf={modalToggled.state && property.id >= 0}
          >
            <TrashIcon />
          </Div>
          <Div
            onClick={() =>
              window.open('/property/' + propState.state.id, '_blank')
            }
            tooltip="view more"
            showIf={modalToggled.state && !expandInPlace && property.id >= 0}
          >
            <ShareIcon />
          </Div>
        </>
      }
      modalContent={
        <div className="body">
          <Separator />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.title))}
            type="text"
            label="Title"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.description))}
            type="text"
            label="Description"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.floor))}
            type="number"
            label="Floor"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.nbRooms))}
            type="number"
            label="Rooms"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.surface))}
            type="number"
            label="Surface"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.rentPerMonth))}
            type="number"
            label="€/month"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.landlord))}
            type="text"
            label="landlord"
            suggestions={landlordsQuery.data?.map(p => p.landlord)}
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.address!.street))}
            type="text"
            label="Street"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.address!.city))}
            type="text"
            label="City"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.address!.zip))}
            type="text"
            label="Zip"
          />
          <Stat
            model={modelOf(nameof.full<Property>(p => p.address!.country))}
            type="text"
            label="Country"
          />
          <Stat
            model={reservedBy}
            type="text"
            label="Reserved by"
            placeholder="email"
            suggestions={getClients.data?.map(p => ({
              label: `${p.firstName} ${p.lastName} (${p.email})`,
              value: p.email,
            }))}
          >
            <Button
              type="text"
              icon={<ShareIcon />}
              onClick={() => window.open('/clients', '_blank')}
              showIf={!shouldCreateNewClient && !!reservedBy.state}
            >
              View
            </Button>
          </Stat>
          <Stat
            model={takeSubState(
              nameof.full<Client>(p => p.firstName),
              newClient,
            )}
            type="text"
            label="First name"
            showIf={shouldCreateNewClient}
          />
          <Stat
            model={takeSubState(
              nameof.full<Client>(p => p.lastName),
              newClient,
            )}
            type="text"
            label="Last name"
            showIf={shouldCreateNewClient}
          />
          <Stat
            model={reservedBy}
            type="text"
            label="Email"
            showIf={shouldCreateNewClient}
          />
          <Stat
            model={takeSubState(
              nameof.full<Client>(p => p.phone),
              newClient,
            )}
            type="text"
            label="Phone"
            showIf={shouldCreateNewClient}
          />
          <Div className="actions">
            <Div className="btn" onClick={hideModal}>
              Cancel
            </Div>
            <Separator direction={Direction.Vertical} />
            <Div className="btn" onClick={saveChanges}>
              Save
            </Div>
          </Div>
        </div>
      }
      hoverContent={
        <>
          <Div
            className="column center"
            onClick={() =>
              window.open('/property/' + propState.state.id, '_blank')
            }
          >
            <ShareIcon />
            view more
          </Div>
          <Separator />

          <Div className="column center">
            <PencilIcon />
            quick edit
          </Div>
        </>
      }
    />
  );
}

const Stat = styled(Input)`
  margin: 0.5em 0;
  width: 100%;

  .label {
    min-width: 6em;
  }
`;

const Card = styled(ExpandableModal)`
  padding: 0;

  .content {
    border-radius: inherit;

    .preview {
      border-radius: inherit;

      img {
        width: 100%;
        height: 16em;
        object-fit: cover;
        border-radius: inherit;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    .body {
      padding: 15px;

      .title {
        font-size: 1.5em;
        font-weight: bold;
        margin-top: 0.5em;
        color: ${p => p.theme.textColorDark};

        &::first-letter {
          text-transform: uppercase;
        }
      }

      .address {
        font-size: 0.8em;
        color: ${p => p.theme.textColorExtraLight};

        &::first-letter {
          text-transform: uppercase;
        }
      }

      .description {
        margin-top: 0.5em;
        color: ${p => p.theme.textColorLighter};

        &::first-letter {
          text-transform: uppercase;
        }
      }

      .summup {
        margin-top: 0.5em;
      }

      .actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 1.5em;

        .btn {
          margin: auto;
          border-radius: 10px;
          width: 100%;
          text-align: center;
          padding: 20px 0;

          &:hover {
            background-color: ${p => p.theme.borderColor};
          }
        }
      }
    }
  }
`;

export function PropertyCardLoadSkeleton() {
  return (
    <LoadSkeletonWrapper
      foregroundColor={ThemeManager.current.backgroundTextColor}
      backgroundColor={ThemeManager.current.backgroundTextColorSoft}
      speed={2}
    >
      <rect x="5" y="15" width="95%" height="272" rx="10" ry="10" />
      <rect x="5" y="310" width="80%" height="30" rx="8" ry="8" />
      <rect x="5" y="360" width="90%" height="40" rx="8" ry="8" />
    </LoadSkeletonWrapper>
  );
}

const LoadSkeletonWrapper = styled(ContentLoader)`
  height: auto;
  min-height: 27em;
  width: 23em;
`;
