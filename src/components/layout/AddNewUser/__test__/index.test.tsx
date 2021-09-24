import React from 'react';
import { render } from '@testing-library/react';
import { AddNewUser } from '../index';

describe('AddNewUser', () => {
  test('it should render the label', () => {
    const { findByText } = render(<AddNewUser></AddNewUser>);

    expect(findByText('ADD NEW USER')).toBeTruthy();
  });
});
