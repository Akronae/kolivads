import { Property } from '@/types/Property';
import { DefaultProps, takeSubState, useState } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Text } from '@/app/components/Text';
import { Direction, Separator } from '@/app/components/Separator';
import { ExpandableModal } from '@/app/components/ExpandableModal';
import { Div } from './Div';
import { ThemeManager, ZIndex } from '@/styles/theme';
import ContentLoader from 'react-content-loader';
import { LocationPinIcon, PencilIcon, ShareIcon } from '@/app/components/icons';
import { Input } from './Input';
import nameof from 'ts-nameof.macro';
import ObjectUtils from '@/utils/ObjectUtils';
import areEqual from 'fast-deep-equal';
import { useHistory } from 'react-router-dom';

export interface Props extends DefaultProps {
  property: Property;
  onPropertyUpdate?: (property: Property) => void;
}

export function PropertyCard(p: Props) {
  let { property, onPropertyUpdate, ...passedProps } = p;

  const [originalPropState, setOriginalPropState] = useState(
    ObjectUtils.clone(property),
  );
  const [propState, setPropState] = useState(ObjectUtils.clone(property));
  const modalToggled = useState(false);
  const history = useHistory();

  if (!areEqual(originalPropState, property)) {
    setOriginalPropState(ObjectUtils.clone(property));
    setPropState(ObjectUtils.clone(property));
  }

  const hideModal = () => {
    modalToggled.state = false;
    setPropState(ObjectUtils.clone(originalPropState));
  };

  const saveChanges = async () => {
    onPropertyUpdate?.(propState);
    hideModal();
  };

  const modelOf = (key: string) => takeSubState(key, propState, setPropState);

  return (
    <Card
      {...passedProps}
      toggleModel={modalToggled}
      previewContent={
        <>
          <img
            src={`/property-previews/${(propState.id % 9) + 1}.jpg`}
            alt="property preview"
          />
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
        <Div
          onClick={() => history.push('/property/' + propState.id)}
          tooltip="view more"
          appearOnParentHover={true}
        >
          <ShareIcon />
        </Div>
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
          <PencilIcon />
          click to edit
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
  background-color: ${p => p.theme.contentBackgroundColor};
  border-radius: 10px;
  box-shadow: ${p => p.theme.boxShadowSharp};
  position: relative;
  padding: 0;

  &.clickable {
    cursor: pointer;

    &:hover {
      .click-action-label {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
      }
      .content {
        filter: brightness(60%);
      }
    }
  }

  &.edit-modal-toggled {
    position: fixed;
    z-index: ${ZIndex.Modal};
    max-width: 45em;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
    max-height: 80vh;
    overflow-y: overlay;

    ::-webkit-scrollbar-thumb {
      background-color: ${p => p.theme.backgroundTextColor};
      border: 6px solid transparent;

      border-radius: 8px;
      background-clip: padding-box;
    }

    ::-webkit-scrollbar {
      width: 16px;
    }

    .content .text {
      padding: 30px;
      padding-bottom: 15px;
    }
  }

  .click-action-label {
    display: none;
    position: absolute;
    top: 0;
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    text-shadow: ${p => p.theme.textShadow};
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);

    svg {
      width: 1.5em;
      height: 1.5em;
      margin-bottom: 0.5em;
    }
  }

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

      .actions {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: row;

        svg {
          width: 30px;
          height: 30px;
          fill: white;
          filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 1));
          cursor: pointer;
          margin: 0 0.2em;
        }
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
