import InfiniteScroll from '@src/components/layout/InfiniteScroll';
import React from 'react';
import styled from 'styled-components';
import { useSearchList } from './hooks';

const List = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;

  > div:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const SearchList: () => JSX.Element = () => {
  const { loadMore, elements, onFetchUsers } = useSearchList();

  return (
    <InfiniteScroll loadMore={loadMore} callback={onFetchUsers}>
      <List>{elements}</List>
    </InfiniteScroll>
  );
};
