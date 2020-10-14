import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Swipeable } from 'react-swipeable';

export interface Props {
  children: JSX.Element[];
}

const margin = 50;
const landscapeRatio = 1.5;

const SCarouselWrapper = styled.div<{ width: number; height: number }>`
  //display: flex;
  padding-bottom: 31px;
  margin: 0;
  width: ${({ width }) => width}px;
  height: calc(100vh - var(--header-height) - 19px);
  overflow-x: scroll;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
  &::-webkit-scrollbar:horizontal {
    height: 11px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border: 2px solid white; /* should match background, can't be transparent */
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 1024px) {
    //width: 100%;
    height: ${({ width }) => width / 1.5}px;
    margin: 0;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    height: ${({ width, height }) => height - 70 - 10}px;
    padding: 0;
    &::-webkit-scrollbar:horizontal {
      display: none;
    }
  }
`;

const SCarouselSlides = styled.div<{ translates: number }>`
  display: flex;
  transform: translateX(-${({ translates }) => translates}px);
  transition: all 0.5s ease;
  width: 100%;
  height: 100%;
  padding: 0 var(--padding);
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    padding: 0 10px;
  }
`;

const Slide = styled.div`
  transition: all 0.5s ease;
  display: flex;
  img {
    height: 100%;
    width: auto;
    margin-right: var(--padding);
    @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
      margin-right: 10px;
    }
  }
`;

export const Carousel = ({ children }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const getDims = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [dims, setDims] = useState(() => getDims());
  const activeSlide = children.map((slide, index) => {
    const { width, height } = slide.props;
    return (
      <Slide key={index} className={width < height ? 'landscape' : 'portrait'}>
        {slide}
      </Slide>
    );
  });

  const handleKey = (e: KeyboardEvent) => {
    if (e.key == 'ArrowLeft') navLeft();
    if (e.key == 'ArrowRight') navRight();
  };

  const navLeft = () => {
    currentSlide !== 0 &&
      setCurrentSlide(
        (currentSlide - 1 + activeSlide.length) % activeSlide.length,
      );
  };

  const navRight = () => {
    currentSlide !== activeSlide.length - 1 &&
      setCurrentSlide((currentSlide + 1) % activeSlide.length);
  };

  const handleResize = () => {
    const newDims = getDims();
    //setDims(newDims);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  });

  const translate =
    children[currentSlide].props.width * currentSlide - currentSlide * 50;

  return (
    <>
      <Swipeable onSwipedLeft={navRight} onSwipedRight={navLeft}>
        <SCarouselWrapper {...dims} className="wrapper">
          <SCarouselSlides translates={translate} className="slides">
            {activeSlide}
          </SCarouselSlides>
        </SCarouselWrapper>
      </Swipeable>
    </>
  );
};
