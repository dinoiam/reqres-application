import { renderHook } from '@testing-library/react-hooks';
import { useHeader } from '../hooks';
import { createMemoryHistory } from 'history';
import { logout } from '@src/redux/action/auth';
import { homeRoot } from '@src/utils/rootPaths';

const history = createMemoryHistory({ initialEntries: ['/profile'] });
jest.mock('react-router-dom', () => ({
  useHistory: () => history,
  useLocation: () => history.location
}));

jest.mock('@src/redux/action/auth', () => ({ logout: jest.fn() }));

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

describe('useHeader', () => {
  test('it should invoke logout', () => {
    const { result } = renderHook(() => useHeader());
    const { onClickLogout } = result.current;

    onClickLogout();

    expect(logout).toHaveBeenCalled();
  });

  test('it should return showGoBack true', () => {
    const { result } = renderHook(() => useHeader());
    const { showGoBack } = result.current;

    expect(showGoBack).toBe(true);
  });

  test('it should return showGoBack true', () => {
    const { result } = renderHook(() => useHeader());
    const { onClickGoBack } = result.current;

    onClickGoBack();

    expect(history.location.pathname).toBe(homeRoot);
  });
});
