export type InfiniteScrollProps = {
  children: React.ReactNode;
  loadMore: boolean;
  loading: boolean;
  callback: () => void;
};
