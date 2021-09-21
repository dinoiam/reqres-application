import { FormElement } from '@src/components/layout/Form/types';

export type UseSearchList = {
  buttonLabel: string;
  filter: string;
  formElements: FormElement;
  onAddNewUserClick: () => void;
  onClickButton: (values: { [key: string]: string }) => void;
};
