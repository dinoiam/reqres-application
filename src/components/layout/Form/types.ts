import { HTMLInputTypeAttribute } from 'react';

export type InputElement = {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  pattern?: RegExp;
  errorMessage?: string;
};

export type FormElement = Array<InputElement>;

export type UseFormProps = {
  formElements: FormElement;
  buttonLabel: string;
  onClickButton: (values: { [key: string]: string }) => void;
};

export type FormViewProps = {
  isButtonDisabled: boolean;
  elements: JSX.Element[];
  buttonLabel: string;
  onClick: () => void;
};
