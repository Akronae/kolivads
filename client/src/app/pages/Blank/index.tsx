import { NavBar } from '@/app/components/NavBar';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

export interface PageParams {}
export function Blank() {
  return (
    <>
      <Helmet>
        <title>Blank</title>
        <meta name="description" content={`blank page`} />
      </Helmet>
      <NavBar />
      <BodyContent></BodyContent>
    </>
  );
}

const BodyContent = styled.div`
  padding: calc(${p => p.theme.navBarHeight} + 2em) ${p => p.theme.appPadding};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
