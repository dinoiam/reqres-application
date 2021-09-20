import React from 'react';
import { useForm } from './hooks';
import { UseFormProps, FormViewProps } from './types';

export const FormView = ({
  elements,
  buttonLabel,
  isButtonDisabled,
  onClick
}: FormViewProps): JSX.Element => {
  return (
    <>
      {elements}
      <button disabled={isButtonDisabled} onClick={onClick}>
        {buttonLabel}
      </button>
    </>
  );
};

export const Form = (props: UseFormProps): JSX.Element => FormView(useForm(props));
