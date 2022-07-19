import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';

interface Props extends DefaultProps {
  type?: 'primary' | 'light';
}

export function Button(p: Props) {
  let { type, ...passedProps } = p;

  type = type || 'primary';
  passedProps.className += ` Button ${type}`;

  return <ButtonWrapper {...passedProps}></ButtonWrapper>;
}

const ButtonWrapper = styled(Div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  padding: 0.7em 1em;
  font-size: 1em;
  box-shadow: ${p => p.theme.boxShadowSharp};

  &.primary {
    background-color: ${p => p.theme.accentColor};
    color: white;
  }

  &.light {
    background-color: ${p => p.theme.borderColor};
    color: ${p => p.theme.textColorLighter};
  }
`;
