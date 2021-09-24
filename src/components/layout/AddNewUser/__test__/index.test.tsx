import React from 'react';
import { render } from '@testing-library/react';
import { AddNewUser } from '../index';

describe('AddNewUser', () => {
  test('it should render the label', () => {
    const { getByText } = render(<AddNewUser></AddNewUser>);

    expect(getByText('ADD NEW USER')).toBeTruthy();
  });
});
