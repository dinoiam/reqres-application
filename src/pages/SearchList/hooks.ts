import { useCallback, useState } from 'react';
import { SearchListViewProps } from './types';

const formElements = [
  {
    id: 'search',
    type: 'text',
    placeholder: 'search',
    defaultValue: ''
  }
];

const buttonLabel = 'SEARCH';

export const useSearchList = (): SearchListViewProps => {
  const [filter, setFilter] = useState('');
  const onClickButton = useCallback((val) => setFilter(val.search), []);

  return {
    buttonLabel,
    filter,
    formElements,
    onClickButton,
    buttonId: 'search'
  };
};
