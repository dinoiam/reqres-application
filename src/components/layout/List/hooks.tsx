import { UserCard } from '@src/components/dumb/UserCard';
import { fetchUsers } from '@src/redux/action/user';
import { getNextPage, getUsersList, getMoreUsers } from '@src/redux/reducer/users';
import { User } from '@src/models/user';
import { filterArrayOfObjectsBy } from '@src/utils/array';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FilteredUserListProps, ListViewProps } from './types';

export const useGetUsers = (): { usersList: User[] } => {
  const usersList = useSelector(getUsersList);
  return {
    usersList
  };
};

export const useFetchMoreUser = (): Pick<ListViewProps, 'loadMore' | 'onFetchMore'> => {
  const dispatch = useDispatch();
  const nextPage = useSelector(getNextPage);
  const moreUsers = useSelector(getMoreUsers);
  const onFetchMore = useCallback(
    () => dispatch(fetchUsers({ page: nextPage })),
    [dispatch, nextPage]
  );
  return {
    loadMore: moreUsers,
    onFetchMore
  };
};

export const useUserCardRender = (usersList: User[]): Pick<ListViewProps, 'elements'> => {
  const history = useHistory();
  const onCardClick = useCallback((userId) => history.push(`/profile/${userId}`), [history]);
  const elements = usersList.map((user) => (
    <UserCard
      key={user.id}
      firstName={user.first_name}
      lastname={user.last_name}
      email={user.email}
      image={user.avatar}
      onClick={() => onCardClick(user.id)}
    ></UserCard>
  ));
  return { elements };
};

export const useUserList = (): ListViewProps => {
  const { usersList } = useGetUsers();
  const { elements } = useUserCardRender(usersList);
  const { loadMore, onFetchMore } = useFetchMoreUser();
  return {
    elements,
    loadMore,
    onFetchMore
  };
};

export const useFilteredUserList = ({ filter }: FilteredUserListProps): ListViewProps => {
  const { usersList } = useGetUsers();
  const filteredElements = filterArrayOfObjectsBy(usersList, filter, [
    'first_name',
    'last_name',
    'email'
  ]);
  const { elements } = useUserCardRender(filteredElements);
  const { loadMore, onFetchMore } = useFetchMoreUser();
  return {
    elements,
    loadMore,
    onFetchMore
  };
};
