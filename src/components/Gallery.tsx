import React, { useEffect, useState } from 'react';

import { Carousel } from './Carousel';
import { Loader } from './Loader';
import { getImages } from '../getImages';

export const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getImages().then((values) => setImages(values));
  }, []);

  return images.length > 0 ? (
    <Carousel>
      {images.map((image, i) => (
        <img src={image} key={i} width="1209" height="806" loading="lazy" />
      ))}
    </Carousel>
  ) : (
    <Loader />
  );
};
