import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Swipeable } from 'react-swipeable';
import icon from './assets/chevron.svg';

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

const Btn = styled.button`
  background: none;
  border: 1px solid #b1b1b1;
  border-radius: 3px;
  padding: 0;
  position: absolute;
  bottom: 10px;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
  &.left {
    left: 10px;
    transform: rotate(180deg);
  }
  &.right {
    right: 10px;
  }
  img {
    display: block;
  }
  &:hover {
    border-color: #848484;
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <>
      <Swipeable onSwipedLeft={navRight} onSwipedRight={navLeft}>
        <SCarouselWrapper {...dims}>
          <SCarouselSlides currentSlide={currentSlide}>
            {activeSlide}
          </SCarouselSlides>
        </SCarouselWrapper>
      </Swipeable>
      <Btn className="left" onClick={navLeft}>
        <img src={icon} />
      </Btn>
      <Btn className="right" onClick={navRight}>
        <img src={icon} />
      </Btn>
    </>
  );
};
