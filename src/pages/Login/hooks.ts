import { login } from '@src/redux/action/auth';
import { ChangeEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';

type UseLoginType = () => {
  buttonLoginDisabled: boolean;
  onClickLogin: () => void;
  setEmail: ChangeEventHandler<HTMLInputElement>;
  setPassword: ChangeEventHandler<HTMLInputElement>;
};

export const useLogin: UseLoginType = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const buttonLoginDisabled = !state.email || !state.password;
  const onClickLogin = () => dispatch(login({ password: state.password, email: state.email }));
  const setEmail: ChangeEventHandler<HTMLInputElement> = (e) =>
    setState((state) => ({ password: state.password, email: e.target.value }));
  const setPassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setState((state) => ({ email: state.email, password: e.target.value }));

  return {
    buttonLoginDisabled,
    onClickLogin,
    setEmail,
    setPassword
  };
};
