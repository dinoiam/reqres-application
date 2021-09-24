import React from 'react';
import { Button } from '@src/components/dumb/Button';
import { useAddNewUser } from './hooks';

export const AddNewUser = (): JSX.Element => {
  const { buttonId, onAddNewUserClick, buttonLabel } = useAddNewUser();

  return (
    <Button data-testid={buttonId} onClick={onAddNewUserClick}>
      {buttonLabel}
    </Button>
  );
};
