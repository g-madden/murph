import React from 'react';
//import { gapi } from 'gapi-script';
import { Carousel } from './Carousel';

export interface Props {}

export const Gallery = () => {
  return (
    <>
      <Carousel>
        <img
          src="https://via.placeholder.com/1209x806"
          width="1209"
          height="806"
        />
        <img
          src="https://via.placeholder.com/1209x806"
          width="1209"
          height="806"
        />
        <img
          src="https://via.placeholder.com/1209x806"
          width="1209"
          height="806"
        />
        <img
          src="https://via.placeholder.com/1209x806"
          width="1209"
          height="806"
        />
        <img
          src="https://via.placeholder.com/1209x806"
          width="1209"
          height="806"
        />
      </Carousel>
    </>
  );
};
