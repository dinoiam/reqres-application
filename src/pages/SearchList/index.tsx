import React from 'react';
import { useHistory } from 'react-router-dom';

export const SearchList: () => JSX.Element = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/profile');
  }
  return (
    <div>
      SEARCH LIST
      <button type="button" onClick={handleClick}>
        Go to the profile
      </button>
    </div>
  );
};
