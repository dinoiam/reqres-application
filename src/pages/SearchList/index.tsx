import React from 'react';
import { Form } from '@src/components/layout/Form';
import styled from 'styled-components';
import { useSearchList } from './hooks';
import { AddNewUser } from '@src/components/layout/AddNewUser';
import { FilteredUserList } from '@src/components/layout/UserList';
import { SearchListViewProps } from './types';
import { FormProps } from '@src/components/layout/Form/types';

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

const AddNewUserWraper = styled.div`
  align-self: flex-start;
  margin-bottom: 20px;
`;

const Search = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const SearchListView = ({
  filter,
  formElements,
  buttonLabel,
  onClickButton,
  buttonId
}: SearchListViewProps & FormProps<'search'>): JSX.Element => {
  return (
    <List>
      <AddNewUserWraper>
        <AddNewUser />
      </AddNewUserWraper>
      <Search>
        <Form
          formElements={formElements}
          onClickButton={onClickButton}
          buttonLabel={buttonLabel}
          buttonId={buttonId}
        ></Form>
      </Search>
      <FilteredUserList filter={filter}></FilteredUserList>
    </List>
  );
};

export const SearchList = (): JSX.Element => SearchListView(useSearchList());
