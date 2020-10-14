import React from 'react';
import styled from 'styled-components';

const color = '#00c5ff';

const Line = styled.div`
  width: 0px;
  border-right: 1px dashed ${color};
  top: 0;
  height: 100vh;
  position: fixed;
  z-index: 99;
`;

const CenterLine = styled(Line)`
  left: 50%;
`;

const LeftLine = styled(Line)`
  left: calc(100% - 1493px - 253.5px);
`;

const RightLine = styled(Line)`
  left: calc(100% - 253.5px);
`;

const HorizLine = styled.div`
  width: 100%;
  height: 0;
  border-bottom: 1px dashed ${color};
  left: 0;
  position: fixed;
  z-index: 99;
`;

const TopLine = styled(HorizLine)`
  top: 108px;
`;

const BottomLine = styled(HorizLine)`
  top: calc(1493px / 1.5);
`;

const Guide = styled.div`
  opacity: 0.5;
  position: fixed;
  top: var(--header-height);
  left: 50px;
  width: calc((100vh - var(--header-height) - var(--padding)) * 1.5);
  height: calc(100vh - var(--header-height) - var(--padding));
  z-index: 99;
  background: teal;
`;

export const Rulers = () => {
  return (
    <div>
      <Guide />
      <CenterLine />
      {/* <TopLine />
      <LeftLine />
      <RightLine />
      <BottomLine /> */}
    </div>
  );
};
