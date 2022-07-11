import { Property } from '@/types/Property';
import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Text } from '@/app/components/Text';
import { Div } from './Div';
import { ThemeManager } from '@/styles/theme';
import ContentLoader from 'react-content-loader';

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
  const { property, ...passedProps } = p;

  return (
    <Card {...passedProps}>
      <img
        src={`property-previews/${(property.id + 1) % 9}.jpg`}
        alt="property preview"
      />
      <div className="content">
        <div className="title">{property.title}</div>
        <Text className="description" limit={100}>
          {property.description}
        </Text>
      </div>
    </Card>
  );
}
const Card = styled(Div)`
  width: 23em;
  background-color: ${p => p.theme.contentBackgroundColor};
  border-radius: 10px;
  box-shadow: ${p => p.theme.boxShadowSharp};

  img {
    width: 100%;
    height: 16em;
    object-fit: cover;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .content {
    padding: 15px;

    .title {
      font-size: 1.5em;
      font-weight: bold;
      margin-top: 0.5em;
      color: ${p => p.theme.textColorDark};
    }

    .description {
      margin-top: 0.5em;
      color: ${p => p.theme.textColorLighter};
    }
  }
`;

const LoadSkeleton = styled(ContentLoader)`
  height: auto;
  min-height: 27em;
  width: 23em;
`;
