import { renderHook } from '@testing-library/react-hooks';
import { useFetchMoreUser, useFilteredUserList, useGetUsers, useUserCardRender } from '../hooks';
import { createMemoryHistory } from 'history';
import { getUsersList, getMoreUsers } from '@src/redux/reducer/users';
import { getIsFetchingUsers } from '@src/redux/reducer/loading';
import { fetchUsers } from '@src/redux/action/user';
import { getUpdateProfileRoot } from '@src/utils/rootPaths';

const history = createMemoryHistory({ initialEntries: ['/profile'] });
jest.mock('react-router-dom', () => ({
  useHistory: () => history,
  useLocation: () => history.location
}));

jest.mock('@src/redux/reducer/users', () => ({
  getUsersList: jest.fn(),
  getMoreUsers: jest.fn(),
  getNextPage: jest.fn()
}));

jest.mock('@src/redux/reducer/loading', () => ({
  getIsFetchingUsers: jest.fn()
}));

jest.mock('@src/redux/action/user', () => ({
  fetchUsers: jest.fn()
}));

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

const mockUsers = [
  {
    id: 1,
    email: 'email_test',
    first_name: 'first_name_test',
    last_name: 'last_name_test',
    avatar: 'avatar_test'
  },
  {
    id: 7,
    email: 'email_test_7',
    first_name: 'first_name_test_7',
    last_name: 'last_name_test_7',
    avatar: 'avatar_test_7'
  }
];

describe('useGetUsers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should returns the users', () => {
    (getUsersList as jest.Mock).mockReturnValueOnce(mockUsers);
    const { result } = renderHook(() => useGetUsers());
    expect(result.current).toEqual(mockUsers);
  });
});

describe('useFetchMoreUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should return loadMore true', () => {
    (getMoreUsers as jest.Mock).mockReturnValueOnce(true);
    const { result } = renderHook(() => useFetchMoreUser());
    const { loadMore } = result.current;
    expect(loadMore).toBe(true);
  });

  test('it should return loadMore false', () => {
    (getMoreUsers as jest.Mock).mockReturnValueOnce(false);
    const { result } = renderHook(() => useFetchMoreUser());
    const { loadMore } = result.current;
    expect(loadMore).toBe(false);
  });

  test('it should return loading false', () => {
    (getIsFetchingUsers as jest.Mock).mockReturnValueOnce(false);
    const { result } = renderHook(() => useFetchMoreUser());
    const { loading } = result.current;
    expect(loading).toBe(false);
  });

  test('it should return loading true', () => {
    (getIsFetchingUsers as jest.Mock).mockReturnValueOnce(true);
    const { result } = renderHook(() => useFetchMoreUser());
    const { loading } = result.current;
    expect(loading).toBe(true);
  });

  describe('when onFetchMore is invoked', () => {
    test('it should call fetchUsers', () => {
      const { result } = renderHook(() => useFetchMoreUser());
      const { onFetchMore } = result.current;

      onFetchMore();

      expect(fetchUsers).toHaveBeenCalledWith({});
    });
  });
});

describe('useUserCardRender', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should return the elemets', () => {
    const { result } = renderHook(() => useUserCardRender(mockUsers));
    const { elements } = result.current;

    expect(elements[0].props['firstName']).toBe(mockUsers[0].first_name);
    expect(elements[0].props['lastName']).toBe(mockUsers[0].last_name);
    expect(elements[0].props['email']).toBe(mockUsers[0].email);
    expect(elements[0].props['image']).toBe(mockUsers[0].avatar);
    expect(elements[1].props['firstName']).toBe(mockUsers[1].first_name);
    expect(elements[1].props['lastName']).toBe(mockUsers[1].last_name);
    expect(elements[1].props['email']).toBe(mockUsers[1].email);
    expect(elements[1].props['image']).toBe(mockUsers[1].avatar);
  });

  describe('on click on one element', () => {
    test('it should open the profile page', () => {
      const { result } = renderHook(() => useUserCardRender(mockUsers));
      const { elements } = result.current;

      elements[0].props['onClick']();

      expect(history.location.pathname).toBe(getUpdateProfileRoot(`${mockUsers[0].id}`));
    });
  });
});

describe('useFilteredUserList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('it should filter the elemets', () => {
    (getUsersList as jest.Mock).mockReturnValueOnce(mockUsers);
    const { result } = renderHook(() => useFilteredUserList({ filter: 'first_name_test_7' }));
    const { elements } = result.current;

    expect(elements.length).toBe(1);
    expect(elements[0].props['firstName']).toBe(mockUsers[1].first_name);
    expect(elements[0].props['lastName']).toBe(mockUsers[1].last_name);
    expect(elements[0].props['email']).toBe(mockUsers[1].email);
    expect(elements[0].props['image']).toBe(mockUsers[1].avatar);
  });
});
