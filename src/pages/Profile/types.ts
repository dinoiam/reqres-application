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
  /** Array of objects that represents the form elements */
  formElements: FormElement;
  /** Label for the button inside the form */
  buttonLabel: string;
  /** Id to print as data-testid inside button element */
  buttonId: string;
  /** Callback invoked on button click */
  onClickButton: (values: { [key: string]: string }) => void;
};
