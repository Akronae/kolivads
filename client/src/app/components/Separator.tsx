import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';

export enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

interface Props extends DefaultProps {
  direction?: Direction;
}

export function Separator(p: Props) {
  const { direction = Direction.Horizontal, ...passedProps } = p;

  passedProps.className += ' Separator';
  passedProps.className += ' ' + direction;

  return <SeparatorWrapper {...passedProps}></SeparatorWrapper>;
}

const SeparatorWrapper = styled(Div)`
  background-color: ${p => p.theme.borderColor};

  &.horizontal {
    width: 100%;
    height: 1px;
    margin: 1em 0;
  }
  &.vertical {
    width: 1px;
    height: auto;
    margin: 0 1em;
  }
`;
