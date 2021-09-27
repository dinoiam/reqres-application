import { FormProps } from '@src/components/layout/Form/types';

export type SearchListViewProps = {
  /** A string used to filter the list  */
  filter: string;
} & FormProps<'search'>;
