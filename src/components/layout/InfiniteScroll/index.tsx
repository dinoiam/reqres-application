import React from 'react';
import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver';
import styled from 'styled-components';
import { InfiniteScrollProps } from './types';

const InfiniteScrollEnd = styled.div``;

export function InfiniteScroll({
  children,
  loadMore,
  callback,
  loading
}: InfiniteScrollProps): JSX.Element {
  const bottomRef = useIntersectionObserver(callback, loading);

  return (
    <>
      {children}
      {!loadMore && (
        <InfiniteScrollEnd data-testid="no-more-results">NOTHING ELSE TO SHOW</InfiniteScrollEnd>
      )}
      {loadMore && <div data-testid="bottom-div" ref={bottomRef}></div>}
      {loadMore && <div data-testid="loading">LOADING</div>}
    </>
  );
}
