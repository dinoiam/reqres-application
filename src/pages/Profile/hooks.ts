import { InputElement } from '@src/components/layout/Form/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/useReduxhooks';
import { createUser, fetchUsersById, updateUser } from '@src/redux/action/user';
import { getUserById } from '@src/redux/reducer/users';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProfileViewProps } from './types';

export const getFormElements = (email = '', firstName = '', lastName = ''): Array<InputElement> => [
  {
    id: 'email',
    type: 'email',
    placeholder: 'Email',
    defaultValue: email,
    pattern: /^\S+@\S+\.\S+$/,
    errorMessage: 'Please enter a valid Email'
  },
  {
    id: 'firstName',
    type: 'text',
    placeholder: 'First Name',
    defaultValue: firstName,
    pattern: /^(?!\s*$).+/,
    errorMessage: 'Please enter the first name'
  },
  {
    id: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
    defaultValue: lastName,
    pattern: /^(?!\s*$).+/,
    errorMessage: 'Please enter the last name'
  }
];

export const useUpdateProfile = (): ProfileViewProps => {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const user = useAppSelector((state) => getUserById(state, userId));
  if (!user) {
    dispatch(fetchUsersById({ userId }));
  }
  const formElements = getFormElements(user?.email, user?.first_name, user?.last_name);
  const onClickButton = ({ email, firstName, lastName }: any) => {
    dispatch(updateUser({ email, firstName, lastName, userId }));
  };
  return {
    formElements,
    buttonLabel: 'Update user',
    onClickButton
  };
};

export const useCreateProfile = (): ProfileViewProps => {
  const dispatch = useAppDispatch();
  const formElements = getFormElements();
  const onClickButton = ({ email, firstName, lastName }: any) => {
    dispatch(createUser({ email, firstName, lastName }));
  };
  return {
    formElements,
    buttonLabel: 'Add new user',
    onClickButton
  };
};
