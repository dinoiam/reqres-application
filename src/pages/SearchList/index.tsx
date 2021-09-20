import { Button } from '@src/components/dumb/Button';
import InfiniteScroll from '@src/components/layout/InfiniteScroll';
import React from 'react';
import styled from 'styled-components';
import { useSearchList } from './hooks';

const List = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  width: 400px;

  > div:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const AddNewUser = styled(Button)`
  align-self: flex-start;
  margin-bottom: 20px;
`;

export const SearchList: () => JSX.Element = () => {
  const { loadMore, elements, onFetchUsers, onAddNewUserClick } = useSearchList();

  return (
    <InfiniteScroll loadMore={loadMore} callback={onFetchUsers}>
      <List>
        <AddNewUser onClick={onAddNewUserClick}>ADD NEW USER</AddNewUser>
        {elements}
      </List>
    </InfiniteScroll>
  );
};
