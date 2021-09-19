import React from 'react';
import styled from 'styled-components';
import { Button } from '@src/components/dumb/Button';
import { useHeader } from './hooks';

const HeaderComponent = styled.header`
  height: 100px;
  position: relative;
  display: flex;
  padding: 20px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const Header: () => JSX.Element = () => {
  const { onClickLogout } = useHeader();
  return (
    <HeaderComponent>
      <Button onClick={onClickLogout}>LOGOUT</Button>
    </HeaderComponent>
  );
};
