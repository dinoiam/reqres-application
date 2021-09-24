import React from 'react';
import { InfiniteScroll } from '../InfiniteScroll';
import { ListViewProps } from './types';

export const List = ({ loadMore, elements, onFetchMore, loading }: ListViewProps): JSX.Element => {
  return (
    <InfiniteScroll loadMore={loadMore} callback={onFetchMore} loading={loading}>
      {elements}
    </InfiniteScroll>
  );
};
