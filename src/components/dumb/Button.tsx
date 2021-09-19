import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.button`
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

export const Button = (buttonProps: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return <ButtonComponent {...buttonProps}></ButtonComponent>;
};
