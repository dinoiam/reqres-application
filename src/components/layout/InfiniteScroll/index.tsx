import { useIntersectionObserver } from '@src/hooks/useIntersectionObserver';
import React from 'react';
import styled from 'styled-components';

type InfiniteScrollProps = {
  children: React.ReactNode;
  loadMore: boolean;
  callback: () => void;
};

const InfiniteScrollEnd = styled.div``;

export default function InfiniteScroll({
  children,
  loadMore,
  callback
}: InfiniteScrollProps): JSX.Element {
  const bottomRef = useIntersectionObserver(callback);

  return (
    <>
      {children}
      {!loadMore && (
        <InfiniteScrollEnd data-testid="no-more-results">NOTHING ELSE TO SHOW</InfiniteScrollEnd>
      )}
      {loadMore && <div data-testid="bottom-div" ref={bottomRef}></div>}
      {loadMore && <div>LOADING</div>}
    </>
  );
}
