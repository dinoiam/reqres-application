/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useActionAfterSaving } from '@src/hooks/useActionAfterSaving';
import { useAppDispatch, useAppSelector } from '@src/hooks/useReduxhooks';
import { createUser, fetchUsersById, updateUser } from '@src/redux/action/user';
import { getIsCreateOrUpdateUserOnError } from '@src/redux/reducer/errors';
import { getIsCreatingOrUpdatingUser } from '@src/redux/reducer/loading';
import { getUserById } from '@src/redux/reducer/users';
import { emailPattern, notEmptyPattern } from '@src/utils/regExpPattern';
import { homeRoot } from '@src/utils/rootPaths';
import { ProfileViewProps } from './types';

export const getFormElements = (
  firstName = '',
  lastName = '',
  email = ''
): ProfileViewProps['formElements'] => [
  {
    id: 'firstName',
    type: 'text',
    placeholder: 'First Name',
    defaultValue: firstName,
    pattern: notEmptyPattern,
    errorMessage: 'Please enter the first name'
  },
  {
    id: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
    defaultValue: lastName,
    pattern: notEmptyPattern,
    errorMessage: 'Please enter the last name'
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Email',
    defaultValue: email,
    pattern: emailPattern,
    errorMessage: 'Please enter a valid Email'
  }
];

export const useOnAfterSave = (): void => {
  const history = useHistory();
  const isUpdating = useAppSelector(getIsCreatingOrUpdatingUser);
  const error = useAppSelector(getIsCreateOrUpdateUserOnError);
  const onAfterSave = () => {
    history.push(homeRoot);
  };
  useActionAfterSaving({ loading: isUpdating, error, actions: onAfterSave });
};

export const useUpdateProfile = (): ProfileViewProps => {
  useOnAfterSave();
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const user = useAppSelector((state) => getUserById(state, userId));
  const formElements = useMemo(
    () => getFormElements(user?.first_name, user?.last_name, user?.email),
    [user]
  );
  const onClickButton: ProfileViewProps['onClickButton'] = useCallback(
    ({ email, firstName, lastName }) => {
      dispatch(updateUser({ email, firstName, lastName, userId }));
    },
    [dispatch, userId]
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUsersById({ userId }));
    }
  }, [dispatch, user, userId]);

  return {
    formElements,
    buttonLabel: 'Update user',
    onClickButton,
    buttonId: 'update_user'
  };
};

export const useCreateProfile = (): ProfileViewProps => {
  useOnAfterSave();
  const dispatch = useAppDispatch();
  const formElements = getFormElements();
  const onClickButton: ProfileViewProps['onClickButton'] = useCallback(
    ({ email, firstName, lastName }) => {
      dispatch(createUser({ email, firstName, lastName }));
    },
    [dispatch]
  );

  return {
    formElements,
    buttonLabel: 'Add new user',
    onClickButton,
    buttonId: 'add_new_user'
  };
};
