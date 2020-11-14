import React, { useEffect, useState } from 'react';
import { getImages } from '../getImages';

import { Carousel } from './Carousel';

export const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getImages().then((values) => setImages(values));
  }, []);

  return images.length > 0 ? (
    <Carousel>
      {images.map((image, i) => (
        <img src={image} key={i} width="1209" height="806" />
      ))}
    </Carousel>
  ) : null;
};
