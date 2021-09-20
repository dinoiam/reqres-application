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

export type ProfileViewProps = {
  handleClick: () => void;
  formElements: FormElement;
  buttonLabel: string;
  onClickButton: (arg: { [key: string]: string }) => void;
};
