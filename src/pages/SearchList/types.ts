import { FormElement } from '@src/components/layout/Form/types';

export type SearchListViewProps = {
  /** A string used to filter the list  */
  filter: string;
  /** Array of objects that represents the form elements */
  formElements: FormElement;
  /** Label for the button inside the form */
  buttonLabel: string;
  /** Id to print as data-testid inside button element */
  buttonId: string;
  /** Callback invoked on button click */
  onClickButton: (values: { [key: string]: string }) => void;
};
