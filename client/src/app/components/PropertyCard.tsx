import { Property } from '@/types/Property';
import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Text } from '@/app/components/Text';
import { Div } from './Div';
import { ThemeManager } from '@/styles/theme';
import ContentLoader from 'react-content-loader';
import { LocationPinIcon, PencilIcon } from '@/app/components/icons';

export interface Props extends DefaultProps {
  property: Property;
}

export function PropertyCardLoadSkeleton() {
  return (
    <LoadSkeleton
      foregroundColor={ThemeManager.current.backgroundTextColor}
      backgroundColor={ThemeManager.current.backgroundTextColorSoft}
      speed={2}
    >
      <rect x="5" y="15" width="95%" height="272" rx="10" ry="10" />
      <rect x="5" y="310" width="80%" height="30" rx="8" ry="8" />
      <rect x="5" y="360" width="90%" height="40" rx="8" ry="8" />
    </LoadSkeleton>
  );
}

export function PropertyCard(p: Props) {
  let { property, className, ...passedProps } = p;
  if (p.onClick) className += ' clickable';

  return (
    <Card {...passedProps} className={className}>
      <div className="content">
        <div className="preview">
          <img
            src={`property-previews/${(property.id % 9) + 1}.jpg`}
            alt="property preview"
          />
        </div>

        <div className="text">
          <div className="title">{property.title}</div>
          <Text className="address" leftIcon={<LocationPinIcon />}>
            {property.address.city}, {property.address.street}
          </Text>
          <Text className="description" limit={100}>
            {property.description}
          </Text>
        </div>
      </div>
      <Text className="click-action-label">
        <PencilIcon />
        click to edit
      </Text>
    </Card>
  );
}
const Card = styled(Div)`
  background-color: ${p => p.theme.contentBackgroundColor};
  border-radius: 10px;
  box-shadow: ${p => p.theme.boxShadowSharp};
  position: relative;

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

  .click-action-label {
    display: none;
    position: absolute;
    top: 0;
    font-size: 1.3em;
    font-weight: bold;
    color: white;
    text-shadow: ${p => p.theme.textShadow};
    left: 50%;
    top: 30%;
    transform: translate(-50%, 30%);

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
    }

    .text {
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
    }
  }
`;

const LoadSkeleton = styled(ContentLoader)`
  height: auto;
  min-height: 27em;
  width: 23em;
`;
