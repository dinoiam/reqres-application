import { Button } from '@src/components/dumb/Button';
import { Input } from '@src/components/dumb/Input';
import { Form } from '@src/components/layout/Form';
import InfiniteScroll from '@src/components/layout/InfiniteScroll';
import { FilteredUserList, UserList } from '@src/components/layout/List';
import React, { useState } from 'react';
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

const Search = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const formElements = [
  {
    id: 'search',
    type: 'text',
    placeholder: 'search',
    defaultValue: ''
  }
];

export const SearchList: () => JSX.Element = () => {
  const { onAddNewUserClick } = useSearchList();
  const [filter, setFilter] = useState('');
  return (
    <List>
      <AddNewUser onClick={onAddNewUserClick}>ADD NEW USER</AddNewUser>
      <Search>
        <Form
          formElements={formElements}
          onClickButton={(val) => setFilter(val.search)}
          buttonLabel="SEARCH"
        ></Form>
      </Search>
      <FilteredUserList filter={filter}></FilteredUserList>
      {/* <UserList></UserList> */}
    </List>
  );
};
