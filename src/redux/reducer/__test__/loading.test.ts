import { login } from '@src/redux/action/auth';
import { fetchUsers, createUser, updateUser } from '@src/redux/action/user';
import loadingReducer, {
  getIsCreatingOrUpdatingUser,
  getIsFetchingUsers,
  getIsSomethingLoading
} from '../loading';

const initialState = {
  [login.typePrefix]: false,
  [fetchUsers.typePrefix]: false,
  [createUser.typePrefix]: false,
  [updateUser.typePrefix]: false
};

const initialStateTrue = {
  [login.typePrefix]: true,
  [fetchUsers.typePrefix]: true,
  [createUser.typePrefix]: true,
  [updateUser.typePrefix]: true
};

describe('loadingReducer', () => {
  describe('on login.pending', () => {
    test('it sets login.typePrefix to true', () => {
      expect(loadingReducer(initialState, login.pending('', {} as never))).toEqual(
        expect.objectContaining({
          [login.typePrefix]: true
        })
      );
    });
  });

  describe('on login.rejected or login.fulfilled', () => {
    test('it sets login.typePrefix to false', () => {
      expect(
        loadingReducer(initialStateTrue, login.rejected(new Error(), '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [login.typePrefix]: false
        })
      );

      expect(
        loadingReducer(initialStateTrue, login.fulfilled({} as never, '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [login.typePrefix]: false
        })
      );
    });
  });

  describe('on fetchUsers.pending', () => {
    test('it sets fetchUsers.typePrefix to true', () => {
      expect(loadingReducer(initialState, fetchUsers.pending('', {} as never))).toEqual(
        expect.objectContaining({
          [fetchUsers.typePrefix]: true
        })
      );
    });
  });

  describe('on fetchUsers.rejected or fetchUsers.fulfilled', () => {
    test('it sets fetchUsers.typePrefix to false', () => {
      expect(
        loadingReducer(initialStateTrue, fetchUsers.rejected(new Error(), '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [fetchUsers.typePrefix]: false
        })
      );

      expect(
        loadingReducer(initialStateTrue, fetchUsers.fulfilled({} as never, '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [fetchUsers.typePrefix]: false
        })
      );
    });
  });

  describe('on createUser.pending', () => {
    test('it sets createUser.typePrefix to true', () => {
      expect(loadingReducer(initialState, createUser.pending('', {} as never))).toEqual(
        expect.objectContaining({
          [createUser.typePrefix]: true
        })
      );
    });
  });

  describe('on createUser.rejected or createUser.fulfilled', () => {
    test('it sets createUser.typePrefix to false', () => {
      expect(
        loadingReducer(initialStateTrue, createUser.rejected(new Error(), '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [createUser.typePrefix]: false
        })
      );

      expect(
        loadingReducer(initialStateTrue, createUser.fulfilled({} as never, '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [createUser.typePrefix]: false
        })
      );
    });
  });

  describe('on updateUser.pending', () => {
    test('it sets updateUser.typePrefix to true', () => {
      expect(loadingReducer(initialState, updateUser.pending('', {} as never))).toEqual(
        expect.objectContaining({
          [updateUser.typePrefix]: true
        })
      );
    });
  });

  describe('on updateUser.rejected or updateUser.fulfilled', () => {
    test('it sets updateUser.typePrefix to false', () => {
      expect(
        loadingReducer(initialStateTrue, updateUser.rejected(new Error(), '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [updateUser.typePrefix]: false
        })
      );

      expect(
        loadingReducer(initialStateTrue, updateUser.fulfilled({} as never, '', {} as never))
      ).toEqual(
        expect.objectContaining({
          [updateUser.typePrefix]: false
        })
      );
    });
  });
});

describe('getIsCreatingOrUpdatingUser', () => {
  test('it should return true', () => {
    expect(
      getIsCreatingOrUpdatingUser({
        loading: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: true,
          [updateUser.typePrefix]: false
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
    expect(
      getIsCreatingOrUpdatingUser({
        loading: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: true
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
  });

  test('it should return false', () => {
    expect(
      getIsCreatingOrUpdatingUser({
        loading: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: false
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(false);
  });
});

describe('getIsFetchingUsers', () => {
  test('it should return true', () => {
    expect(
      getIsFetchingUsers({
        loading: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: true,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: false
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
  });

  test('it should return false', () => {
    expect(
      getIsFetchingUsers({
        loading: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: false
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(false);
  });
});

describe('getIsSomethingLoading', () => {
  test('it should return true', () => {
    expect(
      getIsSomethingLoading({
        loading: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: true,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: true
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
    expect(
      getIsSomethingLoading({
        loading: {
          [login.typePrefix]: true,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: false
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
  });

  test('it should return false', () => {
    expect(
      getIsSomethingLoading({
        loading: {
          [login.typePrefix]: false,
          [fetchUsers.typePrefix]: false,
          [createUser.typePrefix]: false,
          [updateUser.typePrefix]: false
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(false);
  });
});
