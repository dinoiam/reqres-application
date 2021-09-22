import { login, logout } from '@src/redux/action/auth';
import authReducer, { getIsUserAuthenticated } from '../auth';

describe('authReducer', () => {
  describe('on login.fulfilled', () => {
    test('it sets isUserAuthenticated to true', () => {
      expect(authReducer({ isUserAuthenticated: false }, login.fulfilled)).toEqual({
        isUserAuthenticated: true
      });
    });
  });

  describe('on logout', () => {
    test('it sets isUserAuthenticated to false', () => {
      expect(authReducer({ isUserAuthenticated: true }, logout)).toEqual({
        isUserAuthenticated: false
      });
    });
  });
});

describe('getIsUserAuthenticated', () => {
  test('it returns true', () => {
    expect(getIsUserAuthenticated({ auth: { isUserAuthenticated: true } } as any)).toBe(true);
  });
});
