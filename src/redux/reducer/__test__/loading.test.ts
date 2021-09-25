/* eslint-disable @typescript-eslint/no-explicit-any */
import { login } from '@src/redux/action/auth';
import { fetchUsers, createUser, updateUser } from '@src/redux/action/user';
import loadingReducer from '../loading';

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
      expect(loadingReducer(initialState, login.pending('', {} as any))).toEqual(
        expect.objectContaining({
          [login.typePrefix]: true
        })
      );
    });
  });

  describe('on login.rejected or login.fulfilled', () => {
    test('it sets login.typePrefix to false', () => {
      expect(loadingReducer(initialStateTrue, login.rejected(new Error(), '', {} as any))).toEqual(
        expect.objectContaining({
          [login.typePrefix]: false
        })
      );

      expect(loadingReducer(initialStateTrue, login.fulfilled({} as any, '', {} as any))).toEqual(
        expect.objectContaining({
          [login.typePrefix]: false
        })
      );
    });
  });

  describe('on fetchUsers.pending', () => {
    test('it sets fetchUsers.typePrefix to true', () => {
      expect(loadingReducer(initialState, fetchUsers.pending('', {} as any))).toEqual(
        expect.objectContaining({
          [fetchUsers.typePrefix]: true
        })
      );
    });
  });

  describe('on fetchUsers.rejected or fetchUsers.fulfilled', () => {
    test('it sets fetchUsers.typePrefix to false', () => {
      expect(
        loadingReducer(initialStateTrue, fetchUsers.rejected(new Error(), '', {} as any))
      ).toEqual(
        expect.objectContaining({
          [fetchUsers.typePrefix]: false
        })
      );

      expect(
        loadingReducer(initialStateTrue, fetchUsers.fulfilled({} as any, '', {} as any))
      ).toEqual(
        expect.objectContaining({
          [fetchUsers.typePrefix]: false
        })
      );
    });
  });

  describe('on createUser.pending', () => {
    test('it sets createUser.typePrefix to true', () => {
      expect(loadingReducer(initialState, createUser.pending('', {} as any))).toEqual(
        expect.objectContaining({
          [createUser.typePrefix]: true
        })
      );
    });
  });

  describe('on createUser.rejected or createUser.fulfilled', () => {
    test('it sets createUser.typePrefix to false', () => {
      expect(
        loadingReducer(initialStateTrue, createUser.rejected(new Error(), '', {} as any))
      ).toEqual(
        expect.objectContaining({
          [createUser.typePrefix]: false
        })
      );

      expect(
        loadingReducer(initialStateTrue, createUser.fulfilled({} as any, '', {} as any))
      ).toEqual(
        expect.objectContaining({
          [createUser.typePrefix]: false
        })
      );
    });
  });

  describe('on updateUser.pending', () => {
    test('it sets updateUser.typePrefix to true', () => {
      expect(loadingReducer(initialState, updateUser.pending('', {} as any))).toEqual(
        expect.objectContaining({
          [updateUser.typePrefix]: true
        })
      );
    });
  });

  describe('on updateUser.rejected or updateUser.fulfilled', () => {
    test('it sets updateUser.typePrefix to false', () => {
      expect(
        loadingReducer(initialStateTrue, updateUser.rejected(new Error(), '', {} as any))
      ).toEqual(
        expect.objectContaining({
          [updateUser.typePrefix]: false
        })
      );

      expect(
        loadingReducer(initialStateTrue, updateUser.fulfilled({} as any, '', {} as any))
      ).toEqual(
        expect.objectContaining({
          [updateUser.typePrefix]: false
        })
      );
    });
  });
});
