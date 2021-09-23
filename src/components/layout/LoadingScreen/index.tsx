import { Loading } from '@src/components/dumb/Loading';
import React from 'react';
import { useAppSelector } from '@src/hooks/useReduxhooks';
import { getIsSomethingLoading } from '@src/redux/reducer/loading';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
  pointer-events: none;
  position: fixed;
  z-index: 1;
`;

export const LoadingScreen = (): JSX.Element | null => {
  const isSomethingLoading = useAppSelector(getIsSomethingLoading);
  return isSomethingLoading ? (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  ) : null;
};
