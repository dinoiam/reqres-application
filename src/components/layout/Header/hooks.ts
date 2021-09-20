import { logout } from '@src/redux/action/auth';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

type UseHeaderType = () => {
  onClickLogout: () => void;
  onClickGoBack: () => void;
  showGoBack: boolean;
};

export const useHeader: UseHeaderType = () => {
  const dispatch = useDispatch();
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
