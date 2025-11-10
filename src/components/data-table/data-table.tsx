'use client';

import { Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import get from 'lodash/get';

import { cn } from '@/lib/classnames';
import { Input } from '../input';
import { TableBase, TableHead, TableHeader, TableRow } from '../table';
import { PaginationState, DataTablePagination } from './pagination';
import { DataTableBody, DataTableBodyProps } from './body';

export function DataTable<DataType extends object>({
  columns,
  data,
  className,
  tableClassName,
  tableWrapperClassName,
  displaySearch,
  pageSize = 50,
  ...rest
}: DataTableProps<DataType>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize,
  });

  const filteredData = useMemo(() => {
    if (searchTerm) {
      return data.filter((item) =>
        columns
          .filter((it) => it.searchable)
          .some((column) => {
            const value = get(item, column.key);
            return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
          }),
      );
    }
    return data;
  }, [data, searchTerm, columns]);

  // Calculate pagination
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="max-w-xl">
        <Input
          value={searchTerm}
          placeholder="Search..."
          icon={<Search />}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            // Reset to first page when search changes
            setPagination((old) => ({ ...old, currentPage: 1 }));
          }}
        />
      </div>
      <div className="w-full rounded-lg border">
        <TableBase tableClassName={tableClassName} className={tableWrapperClassName}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                const Component = column.sortable ? 'button' : 'div';
                return (
                  <TableHead key={column.key} className={cn(column.actionColumn && 'w-12')}>
                    <Component className={cn('flex items-center', column.center && 'justify-center', column.className)}>
                      {column.header}
                    </Component>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <DataTableBody data={data} columns={columns} searchTerm={searchTerm} filteredData={paginatedData} {...rest} />
        </TableBase>

        <DataTablePagination
          totalItems={filteredData.length}
          pagination={pagination}
          updatePagination={setPagination}
          loading={rest.loading}
        />
      </div>
    </div>
  );
}

export interface DataTableProps<DataType extends object>
  extends Omit<DataTableBodyProps<DataType>, 'searchTerm' | 'filteredData'> {
  className?: string;
  tableClassName?: string;
  tableWrapperClassName?: string;
  displaySearch?: boolean;
  pageSize?: number;
}
