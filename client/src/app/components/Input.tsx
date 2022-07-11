import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';

interface Props extends DefaultProps {
  type: string;
  placeholder: string;
}

export function Input(p: Props) {
  if (p.showIf === false) return null;
  if (p.appearIff === false) p.className += ' opacity-0';

  return (
    <InputWrapper
      type={p.type}
      placeholder={p.placeholder}
      className={p.className}
      onChange={e => p.model && p.model(e.target.value)}
    ></InputWrapper>
  );
}

const InputWrapper = styled.input`
  /* style goes here */
`;
