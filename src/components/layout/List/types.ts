export type ListViewProps = {
  /** The elemets to show inside the list */
  elements: JSX.Element[];
  /** A boolean used to keep the observe the end of the list. If set to false the obeservation will end. */
  loadMore: boolean;
  /** Prevent the invoke of the callback if true */
  loading: boolean;
  /** Callback invoke after the intersection with the last element */
  onFetchMore: () => void;
};
