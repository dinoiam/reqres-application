import { setLocalStorage, removeLocalStorage } from '@src/utils/localStorage';
import { isFulfilled, isAnyOf } from '@reduxjs/toolkit';
import { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { AppDispatch, RootState } from '..';
import { login, logout } from '../action/auth';

export const localStorageMiddleware: Middleware =
  ({ getState }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next: AppDispatch) =>
  (action: AnyAction) => {
    const result = next(action);
    isFulfilled(login)(action) && setLocalStorage({ token: action.payload.token });
    isAnyOf(logout)(action) && removeLocalStorage();

    return result;
  };
