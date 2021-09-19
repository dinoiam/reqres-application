import { setLocalStorage } from '@src/utils/localStorage';
import { Middleware, MiddlewareAPI, AnyAction } from 'redux';
import { AppDispatch, RootState } from '..';
import { loginFullfilledType } from '../action/auth';

// const localStorageMiddleware = ({ getState }) => {
//   return (next) => (action) => {
//     const result = next(action);
//     if ([ACTIONS.LOGIN].includes(result.type)) {
//       localStorage.setItem(appConstants.APP_STATE, JSON.stringify(getState()));
//     }
//     return result;
//   };
// };

export const localStorageMiddleware: Middleware =
  ({ getState }: MiddlewareAPI<AppDispatch, RootState>) =>
  (next: AppDispatch) =>
  (action: AnyAction) => {
    const result = next(action);
    if (action.type === loginFullfilledType) {
      setLocalStorage({ token: action.payload.token });
    }
    return result;
  };
