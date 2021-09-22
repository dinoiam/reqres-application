export type ListViewProps = {
  elements: JSX.Element[];
  loadMore: boolean;
  loading: boolean;
  onFetchMore: () => void;
};

export type FilteredUserListProps = {
  filter: string;
};
