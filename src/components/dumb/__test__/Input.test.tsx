import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  test('snapshot', () => {
    const { container } = render(<Input></Input>);

    expect(container).toMatchSnapshot();
  });
});
