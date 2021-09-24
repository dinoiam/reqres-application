import { renderHook } from '@testing-library/react-hooks';
import { useLogin } from '../hooks';
import { login } from '@src/redux/action/auth';

jest.mock('@src/hooks/useReduxhooks', () => {
  const useAppSelector = jest.fn((callback) => callback && callback());
  const dispatch = function dispatch(callback: () => void) {
    callback && callback();
  };
  const useAppDispatch = function useDispatch() {
    return dispatch;
  };
  return {
    useAppSelector,
    useAppDispatch
  };
});

jest.mock('@src/redux/action/auth', () => ({
  login: jest.fn()
}));

describe('useLogin', () => {
  test('it should return the buttonId', () => {
    const { result } = renderHook(() => useLogin());
    const { buttonId } = result.current;

    expect(buttonId).toBe('login');
  });

  test('it should return the buttonLabel', () => {
    const { result } = renderHook(() => useLogin());
    const { buttonLabel } = result.current;

    expect(buttonLabel).toBe('LOGIN');
  });

  describe('when onClickButton is invoked', () => {
    test('it should call login action', () => {
      const { result } = renderHook(() => useLogin());
      const { onClickButton } = result.current;

      onClickButton({ email: 'test@test.test', password: 'test_password' });

      expect(login).toHaveBeenCalledWith({ email: 'test@test.test', password: 'test_password' });
    });
  });
});
