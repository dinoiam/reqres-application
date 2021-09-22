import React from 'react';
import InfiniteScroll from '../InfiniteScroll';
import { useFilteredUserList, useUserList } from './hooks';
import { FilteredUserListProps, ListViewProps } from './types';

export const List = ({ loadMore, elements, onFetchMore, loading }: ListViewProps): JSX.Element => {
  return (
    <InfiniteScroll loadMore={loadMore} callback={onFetchMore} loading={loading}>
      {elements}
    </InfiniteScroll>
  );
};

export const UserList = (): JSX.Element => List(useUserList());
export const FilteredUserList = ({ filter }: FilteredUserListProps): JSX.Element =>
  List(useFilteredUserList({ filter }));
