/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppDispatch } from '@src/hooks/useReduxhooks';
import { login } from '@src/redux/action/auth';
import { emailPattern, notEmptyPattern } from '@src/utils/regExpPattern';
import { LoginViewProps } from './types';

export const formElements = [
  {
    id: 'email',
    type: 'email',
    placeholder: 'Email',
    defaultValue: '',
    pattern: emailPattern,
    errorMessage: 'Please enter a valid Email'
  },
  {
    id: 'password',
    type: 'password',
    placeholder: 'Search',
    defaultValue: '',
    pattern: notEmptyPattern,
    errorMessage: "Password field can't be empty"
  }
];

export const useLogin = (): LoginViewProps => {
  const dispatch = useAppDispatch();
  const onClickButton = ({ password, email }: any) => dispatch(login({ password, email }));
  const buttonLabel = 'LOGIN';
  return {
    onClickButton,
    buttonLabel,
    formElements,
    buttonId: 'login'
  };
};
