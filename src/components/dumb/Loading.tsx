import React from 'react';
import styled from 'styled-components';

const LoadingAnimation = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    animation: lds-dual-ring 1.2s linear infinite;
    border-radius: 50%;
    border: 6px solid black;
    border-color: black transparent black transparent;
    content: ' ';
    display: block;
    height: 64px;
    margin: 8px;
    width: 64px;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loading = (): JSX.Element => {
  return <LoadingAnimation></LoadingAnimation>;
};
