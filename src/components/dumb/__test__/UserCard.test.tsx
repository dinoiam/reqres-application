import React from 'react';
import { render } from '@testing-library/react';
import { UserCard } from '../UserCard';

describe('UserCard', () => {
  test('snapshot', () => {
    const props = {
      image: 'test_image',
      firstName: 'test_firstName',
      lastName: 'test_lastName',
      email: 'test_email',
      onClick: jest.fn()
    };
    const { container } = render(<UserCard {...props}></UserCard>);

    expect(container).toMatchSnapshot();
  });
});
