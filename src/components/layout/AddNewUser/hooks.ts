import { createProfileRoot } from '@src/utils/rootPaths';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AddNewUserProps } from './types';

export const useAddNewUser = (): AddNewUserProps => {
  const history = useHistory();
  const onAddNewUserClick = useCallback(() => history.push(createProfileRoot), [history]);

  return {
    buttonLabel: 'ADD NEW USER',
    buttonId: 'add_new_user',
    onAddNewUserClick
  };
};
