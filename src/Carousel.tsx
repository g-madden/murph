import React, { useState, ReactElement, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

export interface Props {
  children: JSX.Element[];
}

const margin = 75;
const landscapeRatio = 1.5;

const SCarouselWrapper = styled.div<{ width: number; height: number }>`
  display: flex;
  width: calc(
    ${({ width, height }) =>
        width > height * landscapeRatio ? height * landscapeRatio : width}px -
      ${margin * 2}px
  );
  height: calc(
    ${({ width, height }) =>
        width < height * landscapeRatio ? width / landscapeRatio : height}px -
      ${margin * 2}px
  );
  overflow: hidden;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
    width: ${({ width, height }) =>
      width > height * landscapeRatio ? height * landscapeRatio : width}px;
    height: ${({ width, height }) =>
      width < height * landscapeRatio ? width / landscapeRatio : height}px;
  }
`;

const Slide = styled.div`
  flex: 0 0 auto;
  transition: all 0.5s ease;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.landscape img {
    width: 100%;
    height: auto;
  }
  &.portrait img {
    width: auto;
    height: 100%;
    @media only screen and (max-width: 1024px) and (orientation: portrait) {
      width: 100%;
      height: auto;
    }
  }
`;

const SCarouselSlides = styled.div<{ currentSlide: number }>`
  display: flex;
  ${(props) =>
    props.currentSlide &&
    css`
      transform: translateX(-${props.currentSlide * 100}%);
    `};
  transition: all 0.5s ease;
  width: 100%;
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
    //const ref = useRef(slide);
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

  const handleTouch = (e: TouchEvent) => {
    e.preventDefault();
    //console.log(e.changedTouches);
  };

  const navLeft = () => {
    setCurrentSlide(
      (currentSlide - 1 + activeSlide.length) % activeSlide.length,
    );
  };

  const navRight = () => {
    setCurrentSlide((currentSlide + 1) % activeSlide.length);
  };

  const handleResize = () => {
    const newDims = getDims();
    setDims(newDims);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    //window.addEventListener('touchmove', handleTouch);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <SCarouselWrapper {...dims}>
      <SCarouselSlides currentSlide={currentSlide}>
        {activeSlide}
      </SCarouselSlides>
    </SCarouselWrapper>
  );
};
