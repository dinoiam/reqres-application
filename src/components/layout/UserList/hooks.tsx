import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { UserCard } from '@src/components/dumb/UserCard';
import { useAppSelector, useAppDispatch } from '@src/hooks/useReduxhooks';
import { getIsFetchingUsers } from '@src/redux/reducer/loading';
import { getNextPage, getUsersList, getMoreUsers } from '@src/redux/reducer/users';
import { fetchUsers } from '@src/redux/action/user';
import { User } from '@src/models/user';
import { filterArrayOfObjectsBy } from '@src/utils/array';
import { getUpdateProfileRoot } from '@src/utils/rootPaths';
import { FilteredUserListProps, ListViewProps } from './types';

export const useGetUsers = (): User[] => {
  return useAppSelector(getUsersList);
};

export const useFetchMoreUser = (): Pick<ListViewProps, 'loadMore' | 'onFetchMore' | 'loading'> => {
  const dispatch = useAppDispatch();
  const isFetchingUsers = useAppSelector(getIsFetchingUsers);
  const nextPage = useAppSelector(getNextPage);
  const moreUsers = useAppSelector(getMoreUsers);
  const onFetchMore = useCallback(
    () => dispatch(fetchUsers({ page: nextPage })),
    [dispatch, nextPage]
  );

  return {
    loading: isFetchingUsers,
    loadMore: moreUsers,
    onFetchMore
  };
};

export const useUserCardRender = (usersList: User[]): Pick<ListViewProps, 'elements'> => {
  const history = useHistory();
  const onCardClick = useCallback(
    (userId) => history.push(getUpdateProfileRoot(userId)),
    [history]
  );
  const elements = usersList.map((user) => (
    <UserCard
      key={user.id}
      firstName={user.first_name}
      lastName={user.last_name}
      email={user.email}
      image={user.avatar}
      onClick={() => onCardClick(user.id)}
    ></UserCard>
  ));

  return { elements };
};

export const useUserList = (): ListViewProps => {
  const usersList = useGetUsers();
  const { elements } = useUserCardRender(usersList);
  const { loadMore, onFetchMore, loading } = useFetchMoreUser();

  return {
    loading,
    elements,
    loadMore,
    onFetchMore
  };
};

export const useFilteredUserList = ({ filter }: FilteredUserListProps): ListViewProps => {
  const usersList = useGetUsers();
  const filteredUsers = filterArrayOfObjectsBy(usersList, filter, [
    'first_name',
    'last_name',
    'email'
  ]);
  const { elements } = useUserCardRender(filteredUsers);
  const { loadMore, onFetchMore, loading } = useFetchMoreUser();

  return {
    loading,
    elements,
    loadMore,
    onFetchMore
  };
};
