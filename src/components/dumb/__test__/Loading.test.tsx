import React from 'react';
import { render } from '@testing-library/react';
import { Loading } from '../Loading';

describe('Loading', () => {
  test('snapshot', () => {
    const { container } = render(<Loading></Loading>);

    expect(container).toMatchSnapshot();
  });
});
