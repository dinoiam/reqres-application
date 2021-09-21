export type ListViewProps = {
  elements: JSX.Element[];
  loadMore: boolean;
  onFetchMore: () => void;
};

export type FilteredUserListProps = {
  filter: string;
};
