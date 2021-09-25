import { login, logout } from '@src/redux/action/auth';
import { removeLocalStorage, setLocalStorage } from '@src/utils/localStorage';
import { localStorageMiddleware } from '../localStorage';

jest.mock('@src/utils/localStorage', () => ({
  setLocalStorage: jest.fn(),
  removeLocalStorage: jest.fn()
}));

describe('localStorageMiddleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on login.fulfilled', () => {
    test('it sould set the local Storage', () => {
      const doDispatch = jest.fn();
      const doGetState = jest.fn();
      const next = jest.fn();
      const actionHandler = localStorageMiddleware({
        dispatch: doDispatch,
        getState: doGetState
      })(next);

      actionHandler(login.fulfilled({ token: 'test_token' } as never, '', {} as never));

      expect(setLocalStorage).toHaveBeenCalledWith({ token: 'test_token' });
    });
  });

  describe('on logout', () => {
    test('it sould set the local Storage', () => {
      const doDispatch = jest.fn();
      const doGetState = jest.fn();
      const next = jest.fn();
      const actionHandler = localStorageMiddleware({
        dispatch: doDispatch,
        getState: doGetState
      })(next);

      actionHandler(logout);

      expect(removeLocalStorage).toHaveBeenCalledTimes(1);
    });
  });
});
