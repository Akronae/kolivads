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
import { useMutation } from '@apollo/client';
import GqlBuilder, { GqlVariable } from '@/utils/GqlBuilder';
import { useHistory } from 'react-router-dom';
import {
  createPropertiesQuery,
  deletePropertiesQuery,
  updatePropertiesQuery,
} from '@/services/property';

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

  const [originalPropState, setOriginalPropState] = useState(
    ObjectUtils.clone(property),
  );
  const [propState, setPropState] = useState(ObjectUtils.clone(property));
  const modalToggled = useStateIfDefined(toggleModal, false);
  const history = useHistory();

  const landlordsQuery = useSingleQuery(
    new GqlBuilder<Property>(PropertyOperation.Get)
      .addArgument('filter', new GqlVariable('filter', 'PropertyFilterInput'))
      .select(p => p.landlord),
  );
  const [updateProperty] = useMutation(updatePropertiesQuery.build());
  const createProperties = useSingleMutation(createPropertiesQuery);
  const [deleteProperties] = useMutation(deletePropertiesQuery.build());

  const saveChanges = async () => {
    const update = {
      title: propState.title,
      description: propState.description,
      floor: propState.floor,
      nbRooms: propState.nbRooms,
      surface: propState.surface,
      rentPerMonth: propState.rentPerMonth,
      landlord: propState.landlord,
      address: {
        city: propState.address!.city,
        street: propState.address!.street,
        zip: propState.address!.zip,
        country: propState.address!.country,
      },
    };
    var updated: Property | null = null;

    if (propState.id < 0) {
      updated = (await createProperties({ variables: { data: [update] } }))[0];
    } else {
      await updateProperty({
        variables: {
          filter: { id: propState.id },
          update,
        },
      });
      updated = propState;
    }

    setOriginalPropState(updated!);
    onPropertyUpdate?.(updated!);
    hideModal();
  };

  const deleteCurrentProperty = async () => {
    await deleteProperties({ variables: { filter: { id: propState.id } } });
    hideModal();
    onPropertyUpdate?.(null);
    history.push('/');
  };

  const hideModal = () => {
    modalToggled.state = false;
    setPropState(ObjectUtils.clone(originalPropState));
  };

  const modelOf = (key: string) => takeSubState(key, propState, setPropState);

  if (JSON.stringify(originalPropState) !== JSON.stringify(property)) {
    setOriginalPropState(ObjectUtils.clone(property));
    setPropState(ObjectUtils.clone(property));
  }

  return (
    <Card
      {...passedProps}
      toggleModel={modalToggled}
      expandInPlace={expandInPlace}
      previewContent={
        <>
          {property.id >= 0 && (
            <img
              src={`/property-previews/${(propState.id % 9) + 1}.jpg`}
              alt="property preview"
            />
          )}
          <div className="body">
            <div className="title">{propState.title}</div>
            <Text className="address" leftIcon={<LocationPinIcon />}>
              {propState.address?.city}, {propState.address?.street}
            </Text>
            <Text className="summup">
              {propState.nbRooms} rooms for {propState.surface}m² at floor{' '}
              {propState.floor} for {propState.rentPerMonth}€/month
            </Text>
            <Text className="description" limit={100}>
              {propState.description}
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
            onClick={() => window.open('/property/' + propState.id, '_blank')}
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
            onClick={() => window.open('/property/' + propState.id, '_blank')}
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
