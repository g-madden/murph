import React, { useState, ReactElement, useEffect } from 'react';
import styled, { css } from 'styled-components';

export interface Props {
  children: ReactElement[];
}

const SCarouselWrapper = styled.div<{ width: number; height: number }>`
  display: flex;
  width: ${({ width, height }) =>
    width > height * 1.5 ? height * 1.5 : width}px;
  height: ${({ width, height }) =>
    width < height * 1.5 ? width / 1.5 : height}px;
`;

const Slide = styled.div<{ active?: boolean }>`
  flex: 0 0 auto;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: all 0.5s ease;
  width: 100%;
`;

const SCarouselSlides = styled.div<{ currentSlide: number }>`
  display: flex;
  ${(props) =>
    props.currentSlide &&
    css`
      transform: translateX(-${props.currentSlide * 100}%);
    `};
  transition: all 0.5s ease;
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
  const activeSlide = children.map((slide, index) => (
    <Slide active={currentSlide === index} key={index}>
      {slide}
    </Slide>
  ));

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
