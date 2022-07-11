import { DefaultProps } from '@/utils/ReactUtils';
import styled from 'styled-components';
import { Div } from '@/app/components/Div';

interface Props extends DefaultProps {}

export function Blank(p: Props) {
  return <BlankWrapper {...p}></BlankWrapper>;
}

const BlankWrapper = styled(Div)`
  /* style goes here */
`;
