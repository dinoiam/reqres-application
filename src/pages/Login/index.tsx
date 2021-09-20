import React from 'react';
import { Input } from '@src/components/dumb/Input';
import styled from 'styled-components';
import { useLogin } from './hooks';

const LoginPage = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
`;

export const Login = (): JSX.Element => {
  const { setEmail, setPassword, onClickLogin, buttonLoginDisabled } = useLogin();

  return (
    <LoginPage>
      <LoginForm>
        <Input type="email" onChange={setEmail} placeholder={'Email'}></Input>
        <Input type="password" onChange={setPassword} placeholder={'Password'}></Input>
        <button disabled={buttonLoginDisabled} onClick={onClickLogin}>
          LOGIN
        </button>
      </LoginForm>
    </LoginPage>
  );
};
