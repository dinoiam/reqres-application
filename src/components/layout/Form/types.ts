import { HTMLInputTypeAttribute } from 'react';

export type InputElement<T> = {
  id: T;
  /** The inpunt type */
  type: HTMLInputTypeAttribute;
  /** The inpunt placeholder */
  placeholder?: string;
  /** The inpunt defaultValue */
  defaultValue?: string;
  /** A RegExp used to check if the value of the input is valid */
  pattern?: RegExp;
  /** An error message shown if the value of the input is not valid */
  errorMessage?: string;
};

export type FormElement<T> = Array<InputElement<T>>;

export type FormProps<T extends string = string> = {
  /** Array of objects that represents the form elements */
  formElements: FormElement<T>;
  /** Label for the button inside the form */
  buttonLabel: string;
  /** Id to print as data-testid inside button element */
  buttonId?: string;
  /** Callback invoked on button click */
  onClickButton: (values: { [key in T]: string }) => void;
};

export type FormViewProps = {
  isButtonDisabled: boolean;
  elements: JSX.Element[];
  buttonLabel: string;
  buttonId?: string;
  onClick: () => void;
};
