import React from 'react';
import { Button } from '@src/components/dumb/Button';
import { Form } from '@src/components/layout/Form';
import { FilteredUserList } from '@src/components/layout/List';
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

export const SearchList: () => JSX.Element = () => {
  const { onAddNewUserClick, filter, formElements, buttonLabel, onClickButton } = useSearchList();

  return (
    <List>
      <AddNewUser onClick={onAddNewUserClick}>ADD NEW USER</AddNewUser>
      <Search>
        <Form
          formElements={formElements}
          onClickButton={onClickButton}
          buttonLabel={buttonLabel}
        ></Form>
      </Search>
      <FilteredUserList filter={filter}></FilteredUserList>
    </List>
  );
};
