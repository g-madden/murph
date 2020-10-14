import React, { useEffect } from 'react';
import styled from 'styled-components';
import file from '../assets/IMG_4502.jpg';
import file2 from '../assets/IMG_4549.jpg';
import file3 from '../assets/IMG_4550.jpg';
import file4 from '../assets/IMG_4487.jpg';
//import { gapi } from 'gapi-script';
import { Carousel } from './Carousel';

export interface Props {}

export const Gallery = () => {
  return (
    <>
      <Carousel>
        <img src={file} width="1209" height="806" />
        <img src={file4} width="806" height="1209" />
        <img src={file2} width="1209" height="806" />
        <img src={file3} width="1209" height="806" />
      </Carousel>
    </>
  );
};
