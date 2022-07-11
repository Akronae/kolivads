import Theme from '@/styles/theme';
import { Property } from '@/types/Property';
import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Text } from '@/app/components/Text';

export interface Props extends DefaultProps {
  property: Property;
}

export function PropertyCard({ property }: Props) {
  return (
    <Card>
      <img
        src={`property-previews/${(property.id + 1) % 9}.jpg`}
        alt="property preview"
      />
      <div className="content">
        <div className="title">{property.title}</div>
        <Text className="description">{property.description}</Text>
      </div>
    </Card>
  );
}
const Card = styled.div`
  width: 23em;
  margin: 1em;
  background-color: ${Theme.current.contentBackgroundColor};
  border-radius: 10px;
  box-shadow: ${Theme.current.boxShadowSharp};

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
      color: ${Theme.current.textColorDark};
    }

    .description {
      margin-top: 0.5em;
      color: ${Theme.current.textColorLighter};
    }
  }
`;
