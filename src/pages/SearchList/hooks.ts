import { useCallback, useState } from 'react';
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
