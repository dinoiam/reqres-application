import { useCallback } from 'react';
import { logout } from '@src/redux/action/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@src/hooks/useReduxhooks';
import { homeRoot } from '@src/utils/rootPaths';

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
    history.push(homeRoot);
  };

  return {
    showGoBack,
    onClickGoBack,
    onClickLogout
  };
};
