import React from 'react';
import styled from 'styled-components';
import { useLogin } from './hooks';
import { Form } from '@src/components/layout/Form';

const LoginPage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 300px;
`;

export const Login = (): JSX.Element => {
  const { buttonLabel, formElements, onClickButton, buttonId } = useLogin();

  return (
    <LoginPage>
      <Center>
        <Form
          formElements={formElements}
          onClickButton={onClickButton}
          buttonLabel={buttonLabel}
          buttonId={buttonId}
        ></Form>
      </Center>
    </LoginPage>
  );
};
