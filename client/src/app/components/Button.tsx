import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';

interface Props extends DefaultProps {
  type?: 'primary' | 'light' | 'text';
  icon?: React.ReactNode;
}

export function Button(p: Props) {
  let { type, icon, children, ...passedProps } = p;

  type = type || 'primary';
  passedProps.className += ` Button btn-${type}`;

  return (
    <ButtonWrapper {...passedProps}>
      {icon}
      {children}
    </ButtonWrapper>
  );
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

  &.btn-primary {
    background-color: ${p => p.theme.accentColor};
    color: white;
  }

  &.btn-light {
    background-color: ${p => p.theme.borderColor};
    color: ${p => p.theme.textColorLighter};
  }

  &.btn-text {
    padding: 0px;
    border: none;
    box-shadow: none;
    margin: 0em 0.5em;
  }

  svg {
    width: 1em;
    height: 1em;
    margin-right: 0.2em;
  }
`;
