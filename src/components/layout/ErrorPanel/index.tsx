import React from 'react';
import { useAppSelector } from '@src/hooks/useReduxhooks';
import { getErrorMessage } from '@src/redux/reducer/errors';
import styled from 'styled-components';

const Error = styled.div`
  animation: to-left 1s linear forwards, to-left reverse 1s forwards 4s;
  background: #fd8067;
  box-shadow: 0 2px 10px 0 rgba(35, 35, 35, 0.08);
  position: absolute;
  padding: 20px;
  right: -100%;
  top: 20%;
  z-index: 1031;

  &::first-letter {
    text-transform: capitalize;
  }

  @keyframes to-left {
    from {
      right: -100%;
    }
    to {
      right: 0;
    }
  }
`;

export const ErrorPanel = (): JSX.Element | null => {
  const errorMessage = useAppSelector(getErrorMessage);
  return errorMessage ? <Error>{errorMessage}</Error> : null;
};
