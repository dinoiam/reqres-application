import React, { useCallback } from 'react';
import { fetchUsers } from '@src/redux/action/user';
import { getNextPage, getUsersList, getMoreUsers } from '@src/redux/reducer/users';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserCard } from '@src/components/dumb/UserCard';

export const useSearchList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const nextPage = useSelector(getNextPage);
  const userslist = useSelector(getUsersList);
  const moreUsers = useSelector(getMoreUsers);
  const onFetchUsers = useCallback(
    () => dispatch(fetchUsers({ page: nextPage })),
    [dispatch, nextPage]
  );
  const onCardClick = useCallback((userId) => history.push(`/profile/${userId}`), [history]);
  const onAddNewUserClick = useCallback(() => history.push(`/profile/`), [history]);
  const elements = userslist.map((user) => (
    <UserCard
      key={user.id}
      firstName={user.first_name}
      lastname={user.last_name}
      email={user.email}
      image={user.avatar}
      onClick={() => onCardClick(user.id)}
    ></UserCard>
  ));

  return {
    elements,
    loadMore: moreUsers,
    onFetchUsers,
    onAddNewUserClick
  };
};
