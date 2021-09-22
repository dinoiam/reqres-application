import { axiosInstance } from '@src/api/axios';
import store from '@src/redux';
import { login, logout } from '../auth';

jest.mock('@src/api/axios', () => ({
  axiosInstance: {
    post: jest.fn()
  }
}));

describe('login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('if the login is successful', () => {
    test('it return the token inside the payload', async () => {
      (axiosInstance.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            token: 'mock_token'
          }
        })
      );
      const result = await store.dispatch(
        login({ email: 'mock_email', password: 'mock_password' })
      );
      expect(result).toEqual(
        expect.objectContaining({
          type: login.fulfilled.type,
          payload: { token: 'mock_token' }
        })
      );
    });
  });

  describe('if the login failed', () => {
    test('it return the errorMessage', async () => {
      (axiosInstance.post as jest.Mock).mockImplementationOnce(() =>
        Promise.reject({
          response: {
            data: {
              error: 'login failed'
            }
          }
        })
      );
      const result = await store.dispatch(
        login({ email: 'mock_email', password: 'mock_password' })
      );
      expect(result).toEqual(
        expect.objectContaining({
          type: login.rejected.type,
          payload: { errorMessage: 'login failed' }
        })
      );
    });
  });

  describe('logout', () => {
    test('it returns the right type', async () => {
      const result = await store.dispatch(logout());
      expect(result).toEqual(
        expect.objectContaining({
          type: logout.type
        })
      );
    });
  });
});
