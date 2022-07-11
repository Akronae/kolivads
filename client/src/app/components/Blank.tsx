import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';

interface Props extends DefaultProps {}

export function Blank({ className }: Props) {
  return <BlankWrapper className={className}></BlankWrapper>;
}

const BlankWrapper = styled.div`
  /* style goes here */
`;
