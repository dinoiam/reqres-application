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

type Props = InputHTMLAttributes<HTMLInputElement> & {
  /** boolean value which indicates if the input element is on error state */
  isOnError?: boolean;
  /** message shown if the input element is on error state */
  errorMessage?: string;
};

export const Input = ({
  isOnError,
  errorMessage,
  className,
  ...inputProps
}: Props): JSX.Element => {
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
