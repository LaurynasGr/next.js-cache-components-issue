import { Device } from '../types';
import { TableColumn } from './data-table/types';
import { DataTable, DataTableProps } from './data-table';

const columns: TableColumn<Device>[] = [
  {
    key: 'identifier',
    header: 'Identifier',
  },
  {
    key: 'manufacturer',
    header: 'Manufacturer',
    searchable: true,
  },
  {
    key: 'model',
    header: 'Model',
    searchable: true,
  },
  {
    key: 'year',
    header: 'Year',
  },
  {
    key: 'battery_level',
    header: 'Battery',
  },
  {
    key: 'created_at',
    header: 'Created At',
    type: 'date',
  },
  {
    key: 'updated_at',
    header: 'Updated At',
    type: 'date',
  },
];

export function DevicesTable(props: Omit<DataTableProps<Device>, 'columns'>) {
  return <DataTable columns={columns} {...props} />;
}
