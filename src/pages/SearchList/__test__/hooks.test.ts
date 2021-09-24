import { renderHook, act } from '@testing-library/react-hooks';
import { useSearchList } from '../hooks';

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

describe('useSearchList', () => {
  test('it should return the buttonId', () => {
    const { result } = renderHook(() => useSearchList());
    const { buttonId } = result.current;
    expect(buttonId).toBe('search');
  });

  test('it should return the buttonLabel', () => {
    const { result } = renderHook(() => useSearchList());
    const { buttonLabel } = result.current;
    expect(buttonLabel).toBe('SEARCH');
  });

  describe('when onClickButton is invoked', () => {
    test('it should change the filter value', () => {
      const { result } = renderHook(() => useSearchList());
      const { onClickButton } = result.current;

      expect(result.current.filter).toBe('');

      act(() => {
        onClickButton({ search: 'filter_changed' });
      });

      expect(result.current.filter).toBe('filter_changed');
    });
  });
});
