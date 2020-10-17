import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface Props {
  children: JSX.Element[];
}

const margin = 50;
const landscapeRatio = 1.5;
const mobileQuery =
  '@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3)';
const mobilePortrait = `${mobileQuery} and (orientation: portrait)`;
const mobileLandscape = `${mobileQuery} and (orientation: landscape)`;

const SCarouselWrapper = styled.div<{ width: number; height: number }>`
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
    height: ${({ width }) => width / 1.5}px;
    margin: 0;
  }
  ${mobileLandscape} {
    height: ${({ width, height }) => height - 70 - 10}px;
    padding: 0;
    &::-webkit-scrollbar:horizontal {
      display: none;
    }
  }
  ${mobilePortrait} {
    height: auto;
  }
`;

const SCarouselSlides = styled.div<{ translates: number }>`
  display: flex;
  transform: translateX(-${({ translates }) => translates}px);
  transition: all 0.5s ease;
  width: 100%;
  height: 100%;
  padding: 0 var(--padding);
  ${mobileLandscape} {
    padding: 0 10px;
  }
  ${mobilePortrait} {
    padding: 10px;
    flex-direction: column;
  }
`;

const Slide = styled.div`
  transition: all 0.5s ease;
  display: contents;
  img {
    height: 100%;
    width: auto;
    margin-right: var(--padding);
    ${mobileLandscape} {
      margin-right: 10px;
    }
    ${mobilePortrait} {
      margin: 0 0 10px 0;
      width: 100%;
      height: auto;
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

  const [dims, setDims] = useState(getDims);

  const handleKey = (e: KeyboardEvent) => {
    if (e.key == 'ArrowLeft') navLeft();
    if (e.key == 'ArrowRight') navRight();
  };

  const navLeft = () => {
    currentSlide !== 0 &&
      setCurrentSlide((currentSlide - 1 + children.length) % children.length);
  };

  const navRight = () => {
    currentSlide !== children.length - 1 &&
      setCurrentSlide((currentSlide + 1) % children.length);
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

  const translate =
    children[currentSlide].props.width * currentSlide - currentSlide * 50;

  return (
    <>
      <SCarouselWrapper {...dims} className="wrapper">
        <SCarouselSlides translates={translate} className="slides">
          {children.map((slide, index) => (
            <Slide key={index}>{slide}</Slide>
          ))}
        </SCarouselSlides>
      </SCarouselWrapper>
    </>
  );
};
