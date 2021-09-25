import { setLocalStorage, removeLocalStorage } from '@src/utils/localStorage';
import { isFulfilled, isAnyOf } from '@reduxjs/toolkit';
import { Middleware, AnyAction } from 'redux';
import { AppDispatch } from '..';
import { login, logout } from '../action/auth';

export const localStorageMiddleware: Middleware =
  () => (next: AppDispatch) => (action: AnyAction) => {
    const result = next(action);
    isFulfilled(login)(action) && setLocalStorage({ token: action.payload.token });
    isAnyOf(logout)(action) && removeLocalStorage();

    return result;
  };
