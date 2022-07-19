import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';
import { Text } from '@/app/components/Text';
import { TextIllusatration } from './assets';
import { ReactNode } from 'react';

interface Props extends DefaultProps {
  illustration?: ReactNode;
  text?: string;
}

export function BackgroundIllustration(p: Props) {
  const { children, text, illustration, ...passedProps } = p;

  passedProps.className += ' BackgroundIllustration';

  return (
    <BackgroundIllustrationWrapper {...passedProps}>
      {illustration}
      <Text>{text}</Text>
      {children}
    </BackgroundIllustrationWrapper>
  );
}

const BackgroundIllustrationWrapper = styled(Div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    filter: ${p => p.theme.backgroundImageFilter};
    width: 10em;
    height: 10em;
  }

  .Text {
    margin-top: 3em;
    font-size: 1.2em;
    color: ${p => p.theme.backgroundTextColorHeavy};
  }

  .Button {
    margin-top: 2em;
  }
`;
