import React from 'react';
import ReactDOM from 'react-dom';
import file from './assets/IMG_4502.jpg';
import file2 from './assets/IMG_4549.jpg';
import file3 from './assets/IMG_4550.jpg';
import file4 from './assets/IMG_4753.jpg';
// import { gapi } from 'gapi-script';
import { Carousel } from './Carousel';

export interface Props {}

export const Gallery = () => {
  /* const handleClientLoad = () => {
    gapi.load('client:auth2', initClient);
  }; */
  return (
    <Carousel>
      <img src={file} />
      <img src={file2} />
      <img src={file3} />
      <img src={file4} />
    </Carousel>
  );
};
