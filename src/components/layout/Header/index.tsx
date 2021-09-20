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
  justify-content: space-between;
  align-items: center;
`;

const LogOut = styled(Button)`
  margin-left: auto;
`;

export const Header: () => JSX.Element = () => {
  const { onClickLogout, showGoBack, onClickGoBack } = useHeader();
  return (
    <HeaderComponent>
      {showGoBack && <Button onClick={onClickGoBack}>BACK</Button>}
      <LogOut onClick={onClickLogout}>LOGOUT</LogOut>
    </HeaderComponent>
  );
};
