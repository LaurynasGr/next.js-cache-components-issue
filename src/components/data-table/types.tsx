import { GetFieldType } from 'lodash';
import { ReactNode } from 'react';
import { Paths } from 'type-fest';

type Renderer<DataType, DataIndex extends string> = (
  value: GetFieldType<DataType, DataIndex>,
  row: DataType,
) => ReactNode;

// Base interface for a table column
export interface BaseTableColumn<DataType, DataIndex extends string> {
  key: DataIndex;
  header?: ReactNode;
  render?: Renderer<DataType, DataIndex>;
  defaultValue?: string | number | ReactNode;
  settingsColumn?: boolean;
  actionColumn?: boolean;
  required?: boolean;
  className?: string;
  sortable?: boolean;
  nowrap?: boolean;
  ellipsis?: boolean;
  searchable?: boolean;
  center?: boolean;
  type?: 'date' | 'time';
}

export type TableColumn<DataType, Keys extends string = Paths<DataType, { maxRecursionDepth: 3 }> & string> = {
  [DataIndex in Keys]: BaseTableColumn<DataType, DataIndex>;
}[Keys];
