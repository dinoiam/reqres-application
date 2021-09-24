import { List } from '../List';
import { useUserList, useFilteredUserList } from './hooks';
import { FilteredUserListProps } from './types';

export const UserList = (): JSX.Element => List(useUserList());
export const FilteredUserList = ({ filter }: FilteredUserListProps): JSX.Element =>
  List(useFilteredUserList({ filter }));
