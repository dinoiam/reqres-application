import { renderHook } from '@testing-library/react-hooks';
import { useAddNewUser } from '../hooks';
import { createProfileRoot } from '@src/utils/rootPaths';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
jest.mock('react-router-dom', () => ({ useHistory: () => history }));

describe('useAddNewUser', () => {
  test('it should returns the right values', () => {
    const { result } = renderHook(() => useAddNewUser());
    const { buttonLabel, buttonId, onAddNewUserClick } = result.current;

    expect(buttonLabel).toBe('ADD NEW USER');
    expect(buttonId).toBe('add_new_user');

    onAddNewUserClick();

    expect(history.location.pathname).toBe(createProfileRoot);
  });
});
