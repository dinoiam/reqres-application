import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  test('snapshot', () => {
    const { container } = render(<Button></Button>);

    expect(container).toMatchSnapshot();
  });
});
