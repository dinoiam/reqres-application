import { FormElement } from '@src/components/layout/Form/types';

export type UseSearchList = {
  buttonLabel: string;
  filter: string;
  buttonId: string;
  formElements: FormElement;
  onClickButton: (values: { [key: string]: string }) => void;
};
