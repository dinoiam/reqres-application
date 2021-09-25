export type ListViewProps = {
  elements: JSX.Element[];
  loadMore: boolean;
  loading: boolean;
  onFetchMore: () => void;
};

export type FilteredUserListProps = {
  /** A filter string used to match filter the users by first name, last name and email*/
  filter: string;
};
