import React from 'react';
import { InputText } from '@src/components/dumb/InputText';
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
        <InputText type="email" onChange={setEmail} placeholder={'Email'}></InputText>
        <InputText type="password" onChange={setPassword} placeholder={'Password'}></InputText>
        <button disabled={buttonLoginDisabled} onClick={onClickLogin}>
          LOGIN
        </button>
      </LoginForm>
    </LoginPage>
  );
};
