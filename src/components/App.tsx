import React from 'react';
import { Gallery } from './Gallery';
import styled from 'styled-components';
import { Header } from './Header';
import { Rulers } from './Rulers';

interface AppProps {}

const Container = styled.div`
  display: grid;
  align-content: start;
  // justify-content: center;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  height: 100vh;
  @media only screen and (max-width: 1024px) {
    margin: 0;
    height: 100vh;
  }
  * {
    box-sizing: border-box;
  }
`;

function App({}: AppProps) {
  return (
    <>
      {/* <Rulers /> */}
      <Container>
        <Header />
        <Gallery />
      </Container>
    </>
  );
}

export default App;
