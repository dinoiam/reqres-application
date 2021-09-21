import { useCallback } from 'react';
import { logout } from '@src/redux/action/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@src/hooks/useReduxhooks';

type UseHeaderType = () => {
  onClickLogout: () => void;
  onClickGoBack: () => void;
  showGoBack: boolean;
};

export const useHeader: UseHeaderType = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const showGoBack = location.pathname != '/';
  const onClickLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const onClickGoBack = () => {
    history.goBack();
  };

  return {
    showGoBack,
    onClickGoBack,
    onClickLogout
  };
};
