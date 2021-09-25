import { login } from '@src/redux/action/auth';
import { fetchUsers, createUser, updateUser } from '@src/redux/action/user';
import errorReducer, { getIsCreateOrUpdateUserOnError, getLastErrorMessage } from '../errors';

const initialState = {
  [login.typePrefix]: false,
  [fetchUsers.typePrefix]: false,
  [createUser.typePrefix]: false,
  [updateUser.typePrefix]: false,
  lastErrorMessage: ''
};

const initialStateTrue = {
  [login.typePrefix]: false,
  [fetchUsers.typePrefix]: false,
  [createUser.typePrefix]: false,
  [updateUser.typePrefix]: false,
  lastErrorMessage: ''
};

describe('errorReducer', () => {
  const actions = [login, fetchUsers, createUser, updateUser];

  describe('on action.rejected', () => {
    test('it sets action.typePrefix to true', () => {
      actions.map((action) => {
        expect(
          errorReducer(
            initialState,
            action.rejected(new Error(), '', {} as never, {
              errorMessage: `${action.typePrefix} rejected`
            })
          )
        ).toEqual(
          expect.objectContaining({
            lastErrorMessage: `${action.typePrefix} rejected`,
            [action.typePrefix]: true
          })
        );
      });
    });
  });

  describe('on action.pending', () => {
    test('it sets action.typePrefix to false', () => {
      actions.map((action) => {
        expect(errorReducer(initialStateTrue, action.pending('', {} as never))).toEqual(
          expect.objectContaining({
            [action.typePrefix]: false
          })
        );
      });
    });
  });
});

describe('getIsCreateOrUpdateUserOnError', () => {
  test('it should return true', () => {
    expect(
      getIsCreateOrUpdateUserOnError({
        errors: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: true,
          [updateUser.typePrefix]: false,
          lastErrorMessage: ''
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
    expect(
      getIsCreateOrUpdateUserOnError({
        errors: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: true,
          lastErrorMessage: ''
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
  });

  test('it should return false', () => {
    expect(
      getIsCreateOrUpdateUserOnError({
        errors: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: false,
          lastErrorMessage: ''
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(false);
  });
});

describe('getLastErrorMessage', () => {
  test('it should return lastErrorMessage', () => {
    expect(
      getLastErrorMessage({
        errors: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: true,
          [updateUser.typePrefix]: false,
          lastErrorMessage: 'last error test'
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe('last error test');
  });
});
