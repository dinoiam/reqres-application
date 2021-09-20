import { InputElement } from '@src/components/layout/Form/types';
import { useAppSelector } from '@src/hooks/useReduxhooks';
import { createUser, fetchUsersById, updateUser } from '@src/redux/action/user';
import { getUserById } from '@src/redux/reducer/users';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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

export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const user = useAppSelector((state) => getUserById(state, userId));
  if (!user) {
    dispatch(fetchUsersById({ userId }));
  }
  function handleClick() {
    history.push('/');
  }
  const formElements = getFormElements(user?.email, user?.first_name, user?.last_name);
  const onClickButton = ({ email, firstName, lastName }: any) => {
    dispatch(updateUser({ email, firstName, lastName, userId }));
  };
  return {
    handleClick,
    formElements,
    buttonLabel: 'Update user',
    onClickButton
  };
};

export const useCreateProfile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleClick() {
    history.push('/');
  }
  const formElements = getFormElements();
  const onClickButton = ({ email, firstName, lastName }: any) => {
    dispatch(createUser({ email, firstName, lastName }));
  };
  return {
    handleClick,
    formElements,
    buttonLabel: 'Add new user',
    onClickButton
  };
};
