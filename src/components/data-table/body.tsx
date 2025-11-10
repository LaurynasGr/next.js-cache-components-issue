import { isValid, format } from 'date-fns';
import { Fragment } from 'react';
import get from 'lodash/get';

import { cn } from '@/lib/classnames';
import { TableBody, TableCell, TableRow } from '../table';
import { Skeleton } from '../skeleton';
import { TableColumn } from './types';

export function DataTableBody<DataType extends object>({
  columns,
  data,
  filteredData,
  searchTerm,
  skeletonRows = 5,
  loading,
  showSkeleton,
}: DataTableBodyProps<DataType>) {
  const renderNoDataRows = () => {
    if (data.length === 0) {
      if ((loading || showSkeleton) && skeletonRows > 0) {
        return Array.from({ length: skeletonRows }).map((_, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell className={column.className} key={column.key}>
                {!column.actionColumn && (
                  <div className={cn('flex flex-col', column.center && 'justify-center items-center')}>
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-3/4 h-2.5 mt-2" />
                  </div>
                )}
              </TableCell>
            ))}
          </TableRow>
        ));
      }
    }

    const searchMessage = searchTerm ? (
      <Fragment>
        for <span className="font-bold italic">{searchTerm}</span>
      </Fragment>
    ) : null;

    return (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results found{searchMessage}.
        </TableCell>
      </TableRow>
    );
  };
  return (
    <TableBody>
      {filteredData.length === 0
        ? renderNoDataRows()
        : filteredData.map((row, index) => (
            <TableRow key={index} className="min-h-14">
              {columns.map((column) => {
                const value = get(row, column.key);
                const formattedValue = (() => {
                  if (value === undefined || value === null) {
                    return column.defaultValue ?? '-';
                  }

                  if (isPrimitive(value)) {
                    if (column.type === 'date') {
                      const date = new Date(value);
                      return isValid(date) ? format(date, 'PP HH:mm:ss') : value;
                    }
                    if (column.type === 'time') {
                      const date = new Date(value);
                      return isValid(date) ? format(date, 'HH:mm:ss') : value;
                    }
                  }

                  return value;
                })();

                return (
                  <TableCell
                    key={column.key}
                    title={isPrimitive(formattedValue) ? String(formattedValue) : undefined}
                    className={cn(
                      column.center && 'text-center',
                      column.nowrap && 'text-nowrap',
                      column.ellipsis && 'truncate max-w-1',
                      'min-h-14',
                      column.className,
                    )}
                  >
                    {column.render ? column.render(value, row) : (formattedValue as React.ReactNode)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
    </TableBody>
  );
}

export interface DataTableBodyProps<DataType extends object> {
  columns: TableColumn<DataType>[];
  filteredData: DataType[];
  data: DataType[];
  searchTerm?: string;
  skeletonRows?: number;
  loading?: boolean;
  showSkeleton?: boolean;
}

function isPrimitive(val: unknown) {
  return val !== null && (typeof val === 'string' || typeof val === 'number');
}
