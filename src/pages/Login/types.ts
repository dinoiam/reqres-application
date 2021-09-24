import { FormElement } from '@src/components/layout/Form/types';

export type UseLoginType = () => {
  buttonLabel: string;
  buttonId: string;
  formElements: FormElement;
  onClickButton: (values: { [key: string]: string }) => void;
};
