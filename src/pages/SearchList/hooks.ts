import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { UseSearchList } from './types';

export const useSearchList = (): UseSearchList => {
  const history = useHistory();
  const onAddNewUserClick = useCallback(() => history.push(`/profile/`), [history]);

  return {
    onAddNewUserClick
  };
};
