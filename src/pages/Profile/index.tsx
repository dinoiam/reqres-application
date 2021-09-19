import React from 'react';
import { useHistory } from 'react-router-dom';

export const Profile: () => JSX.Element = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/');
  }

  return (
    <div>
      PROFILE
      <button type="button" onClick={handleClick}>
        Go to the search
      </button>
    </div>
  );
};
