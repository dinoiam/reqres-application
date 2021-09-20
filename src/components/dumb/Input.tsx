import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  padding-top: 15px;
`;

const StyledInput = styled.input`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;

  &.input-error {
    border-color: red;
  }
`;

const Error = styled.p`
  position: absolute;
  top: 0;
  color: red;
  font-size: 14px;
`;

export const Input = ({
  isOnError,
  errorMessage,
  className,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  isOnError?: boolean;
  errorMessage?: string;
}): JSX.Element => {
  return (
    <InputWrapper>
      {isOnError && <Error>{errorMessage}</Error>}
      <StyledInput
        className={`${className} ${isOnError ? 'input-error' : ''}`}
        {...inputProps}
      ></StyledInput>
    </InputWrapper>
  );
};
