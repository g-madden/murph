import React from 'react';
import { Gallery } from './Gallery';
import styled from 'styled-components';

interface AppProps {}

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 75px;
  height: calc(100vh - 150px);
  @media only screen and (max-width: 1024px) {
    margin: 0;
    height: 100vh;
  }
`;

function App({}: AppProps) {
  return (
    <Container>
      <Gallery />
    </Container>
  );
}

export default App;
