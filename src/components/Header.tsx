import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logos.svg';

const Hdr = styled.header`
  padding: 10px;
  h1 {
    margin: 0;
  }
`;

const Logo = styled.img`
  display: block;
  width: 200px;
  height: auto;
  margin-left: 39px;
  @media only screen and (max-width: 1024px) and (orientation: landscape) {
    width: 100px;
  }
`;

export const Header = () => {
  return (
    <Hdr>
      <Logo src={logo} alt="Hot Dreams" />
    </Hdr>
  );
};
