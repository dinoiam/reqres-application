import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
`;

export const InputText = (inputProps: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  return <Input {...inputProps}></Input>;
};
