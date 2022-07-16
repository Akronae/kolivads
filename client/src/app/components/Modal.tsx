import styled from 'styled-components';
import { DefaultProps } from '@/utils/ReactUtils';
import { Div } from '@/app/components/Div';
import { Text } from '@/app/components/Text';
import { ReactNode } from 'react';

export interface ModalAction {
  label: string;
  onClick: () => void;
}

export interface ModalProps extends DefaultProps {
  title?: ReactNode;
  actions?: ModalAction[];
}

export function Modal(p: ModalProps) {
  return (
    <ModalWrapper {...p}>
      <ModalTitle>{p.title}</ModalTitle> {p.children}
    </ModalWrapper>
  );
}
const ModalWrapper = styled(Div)`
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
  z-index: 10;
  min-width: 95vw;
  min-height: 20em;
  background-color: ${p => p.theme.contentBackgroundColor};
  border-radius: 10px;
  padding: 2em;
`;

const ModalTitle = styled(Text)`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1em;
`;
