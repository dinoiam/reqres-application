import { logout } from '@src/redux/action/auth';
import { getTokenFromLocalStorage } from '@src/utils/localStorage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const useCheckTokenOnRouteChange: () => void = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const listener = history.listen(() => {
      const token = getTokenFromLocalStorage();
      if (!token) {
        dispatch(logout());
      }
    });
    return () => {
      listener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
