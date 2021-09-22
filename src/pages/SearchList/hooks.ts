import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UseSearchList } from './types';

const formElements = [
  {
    id: 'search',
    type: 'text',
    placeholder: 'search',
    defaultValue: ''
  }
];
const buttonLabel = 'SEARCH';

export const useSearchList = (): UseSearchList => {
  const history = useHistory();
  const [filter, setFilter] = useState('');
  const onAddNewUserClick = useCallback(() => history.push(`/profile/`), [history]);
  const onClickButton = useCallback((val) => setFilter(val.search), []);
  return {
    buttonLabel,
    onAddNewUserClick,
    filter,
    formElements,
    onClickButton
  };
};
