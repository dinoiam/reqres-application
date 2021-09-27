import React from 'react';
import { useForm } from './hooks';
import { FormProps, FormViewProps } from './types';

export const FormView = ({
  elements,
  buttonLabel,
  isButtonDisabled,
  onClick,
  buttonId
}: FormViewProps): JSX.Element => {
  return (
    <>
      {elements}
      <button disabled={isButtonDisabled} onClick={onClick} data-testid={buttonId}>
        {buttonLabel}
      </button>
    </>
  );
};

export const Form = <T extends string>(props: FormProps<T>): JSX.Element =>
  FormView(useForm(props));
