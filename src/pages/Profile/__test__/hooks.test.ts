import { notEmptyPattern, emailPattern } from '@src/utils/regExpPattern';
import { renderHook } from '@testing-library/react-hooks';
import { getFormElements, useCreateProfile, useUpdateProfile } from '../hooks';
import { createUser, fetchUsersById, updateUser } from '@src/redux/action/user';
import { getUserById } from '@src/redux/reducer/users';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory({ initialEntries: ['/profile'] });
jest.mock('react-router-dom', () => ({
  useHistory: () => history,
  useLocation: () => history.location,
  useParams: () => ({ userId: 1 })
}));

const mockUser = {
  id: 1,
  email: 'email_test',
  first_name: 'first_name_test',
  last_name: 'last_name_test',
  avatar: 'avatar_test'
};

jest.mock('@src/hooks/useReduxhooks', () => {
  const useAppSelector = jest.fn((callback) => callback && callback());
  const dispatch = function dispatch(callback: () => void) {
    callback && callback();
  };
  const useAppDispatch = function useDispatch() {
    return dispatch;
  };
  return {
    useAppSelector,
    useAppDispatch
  };
});

jest.mock('@src/redux/reducer/errors', () => ({
  getIsCreateOrUpdateUserOnError: jest.fn()
}));

jest.mock('@src/redux/reducer/loading', () => ({
  getIsCreatingOrUpdatingUser: jest.fn()
}));

jest.mock('@src/redux/reducer/users', () => ({
  getUserById: jest.fn()
}));

jest.mock('@src/redux/action/user', () => ({
  updateUser: jest.fn(),
  createUser: jest.fn(),
  fetchUsersById: jest.fn()
}));

describe('getFormElements', () => {
  test('it should return the formsElement with the empty values', () => {
    expect(getFormElements()).toEqual([
      {
        id: 'firstName',
        type: 'text',
        placeholder: 'First Name',
        defaultValue: '',
        pattern: notEmptyPattern,
        errorMessage: 'Please enter the first name'
      },
      {
        id: 'lastName',
        type: 'text',
        placeholder: 'Last Name',
        defaultValue: '',
        pattern: notEmptyPattern,
        errorMessage: 'Please enter the last name'
      },
      {
        id: 'email',
        type: 'email',
        placeholder: 'Email',
        defaultValue: '',
        pattern: emailPattern,
        errorMessage: 'Please enter a valid Email'
      }
    ]);
  });

  test('it should return the formsElement with the given values', () => {
    expect(getFormElements('test_firstName', 'test_lastName', 'test_email')).toEqual([
      {
        id: 'firstName',
        type: 'text',
        placeholder: 'First Name',
        defaultValue: 'test_firstName',
        pattern: notEmptyPattern,
        errorMessage: 'Please enter the first name'
      },
      {
        id: 'lastName',
        type: 'text',
        placeholder: 'Last Name',
        defaultValue: 'test_lastName',
        pattern: notEmptyPattern,
        errorMessage: 'Please enter the last name'
      },
      {
        id: 'email',
        type: 'email',
        placeholder: 'Email',
        defaultValue: 'test_email',
        pattern: emailPattern,
        errorMessage: 'Please enter a valid Email'
      }
    ]);
  });
});

describe('useUpdateProfile', () => {
  test('it should return the buttonId', () => {
    (getUserById as jest.Mock).mockReturnValue(mockUser);
    const { result } = renderHook(() => useUpdateProfile());
    const { buttonId } = result.current;
    expect(buttonId).toBe('update_user');
  });

  test('it should return the buttonLabel', () => {
    (getUserById as jest.Mock).mockReturnValue(mockUser);
    const { result } = renderHook(() => useUpdateProfile());
    const { buttonLabel } = result.current;
    expect(buttonLabel).toBe('Update user');
  });

  describe('when onClickButton is invoked', () => {
    test('it should call updateUser', () => {
      (getUserById as jest.Mock).mockReturnValue(mockUser);
      const { result } = renderHook(() => useUpdateProfile());
      const { onClickButton } = result.current;
      onClickButton({
        email: 'test@test.test',
        firstName: 'test_firstName',
        lastName: 'test_lastName'
      });
      expect(updateUser).toHaveBeenCalledWith({
        email: 'test@test.test',
        firstName: 'test_firstName',
        lastName: 'test_lastName',
        userId: 1
      });
    });
  });

  describe('when the user is already inside the store', () => {
    test('it should not call updateUser', () => {
      (getUserById as jest.Mock).mockReturnValue(mockUser);
      renderHook(() => useUpdateProfile());
      expect(fetchUsersById).not.toHaveBeenCalled();
    });
  });

  describe('when the user is not inside the store', () => {
    test('it should call updateUser', () => {
      (getUserById as jest.Mock).mockReturnValue(undefined);
      renderHook(() => useUpdateProfile());
      expect(fetchUsersById).toHaveBeenCalledWith({ userId: 1 });
    });
  });
});

describe('useCreateProfile', () => {
  test('it should return the buttonId', () => {
    const { result } = renderHook(() => useCreateProfile());
    const { buttonId } = result.current;
    expect(buttonId).toBe('add_new_user');
  });

  test('it should return the buttonLabel', () => {
    const { result } = renderHook(() => useCreateProfile());
    const { buttonLabel } = result.current;
    expect(buttonLabel).toBe('Add new user');
  });

  describe('when onClickButton is invoked', () => {
    test('it should call createUser', () => {
      (getUserById as jest.Mock).mockReturnValue(mockUser);
      const { result } = renderHook(() => useCreateProfile());
      const { onClickButton } = result.current;
      onClickButton({
        email: 'test@test.test',
        firstName: 'test_firstName',
        lastName: 'test_lastName'
      });
      expect(createUser).toHaveBeenCalledWith({
        email: 'test@test.test',
        firstName: 'test_firstName',
        lastName: 'test_lastName'
      });
    });
  });
});
