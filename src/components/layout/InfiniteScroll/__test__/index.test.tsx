import React from 'react';
import { render } from '@testing-library/react';
import { InfiniteScroll } from '../index';

describe('InfiniteScroll', () => {
  test('it should render the bottom div', () => {
    const props = {
      children: <div></div>,
      loadMore: true,
      loading: false,
      callback: jest.fn()
    };
    const { getByTestId } = render(<InfiniteScroll {...props}></InfiniteScroll>);

    expect(getByTestId('bottom-div')).toBeTruthy();
  });

  test('it should render the loading', () => {
    const props = {
      children: <div></div>,
      loadMore: true,
      loading: false,
      callback: jest.fn()
    };
    const { getByTestId } = render(<InfiniteScroll {...props}></InfiniteScroll>);

    expect(getByTestId('loading')).toBeTruthy();
  });

  test('it should render no-more-results', () => {
    const props = {
      children: <div></div>,
      loadMore: false,
      loading: false,
      callback: jest.fn()
    };
    const { getByTestId } = render(<InfiniteScroll {...props}></InfiniteScroll>);

    expect(getByTestId('no-more-results')).toBeTruthy();
  });

  test('it should render the children', () => {
    const props = {
      children: <div data-testid="children"></div>,
      loadMore: false,
      loading: false,
      callback: jest.fn()
    };
    const { getByTestId } = render(<InfiniteScroll {...props}></InfiniteScroll>);

    expect(getByTestId('children')).toBeTruthy();
  });
});
