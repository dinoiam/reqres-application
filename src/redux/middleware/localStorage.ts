import { setLocalStorage, removeLocalStorage } from '@src/utils/localStorage';
import { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { AppDispatch, RootState } from '..';
import { loginFullfilledType, logout } from '../action/auth';

export const localStorageMiddleware: Middleware =
  ({ getState }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next: AppDispatch) =>
  (action: AnyAction) => {
    const result = next(action);
    switch (action.type) {
      case loginFullfilledType:
        setLocalStorage({ token: action.payload.token });
        break;
      case logout.toString():
        removeLocalStorage();
        break;
    }

    return result;
  };
