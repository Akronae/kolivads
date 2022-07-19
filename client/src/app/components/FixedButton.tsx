import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';
import { PlusIcon } from './assets';

interface Props extends DefaultProps {}

export function FixedButton(p: Props) {
  const { ...passedProps } = p;

  passedProps.className += ' FixedButton';

  return (
    <FixedButtonWrapper {...passedProps}>
      <PlusIcon />
    </FixedButtonWrapper>
  );
}

const FixedButtonWrapper = styled(Div)`
  width: 3em;
  height: 3em;
  background-color: ${p => p.theme.accentColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  position: fixed;
  right: 30px;
  bottom: 30px;
  box-shadow: ${p => p.theme.boxShadowDiffuse};

  svg {
    fill: ${p => p.theme.contentBackgroundColor};
  }
`;
