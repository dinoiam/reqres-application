import { renderHook } from '@testing-library/react-hooks';
import { useActionAfterSaving } from '../useActionAfterSaving';

describe('useActionAfterSaving', () => {
  it('it should call the action only when the loading is false again', () => {
    const actions = jest.fn();
    const { rerender } = renderHook(useActionAfterSaving, {
      initialProps: { loading: false, error: false, actions }
    });

    expect(actions).not.toHaveBeenCalled();

    rerender({ loading: true, error: false, actions });

    expect(actions).not.toHaveBeenCalled();

    rerender({ loading: false, error: false, actions });

    expect(actions).toHaveBeenCalledTimes(1);
  });

  describe('if error is true', () => {
    it('it should not call the action', () => {
      const actions = jest.fn();
      const { rerender } = renderHook(useActionAfterSaving, {
        initialProps: { loading: false, error: false, actions }
      });

      expect(actions).not.toHaveBeenCalled();

      rerender({ loading: true, error: false, actions });

      expect(actions).not.toHaveBeenCalled();

      rerender({ loading: false, error: true, actions });

      expect(actions).not.toHaveBeenCalled();
    });
  });
});
