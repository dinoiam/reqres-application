import { logout } from '@src/redux/action/auth';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

type UseHeaderType = () => {
  onClickLogout: () => void;
};

export const useHeader: UseHeaderType = () => {
  const dispatch = useDispatch();
  const onClickLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return {
    onClickLogout
  };
};
