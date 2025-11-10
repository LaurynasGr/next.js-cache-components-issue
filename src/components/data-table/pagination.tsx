import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { cn } from '@/lib/classnames';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { Button } from '../button';

const PAGE_SIZES = [5, 10, 20, 30, 40, 50];

export function DataTablePagination({
  className,
  pagination,
  updatePagination,
  totalItems,
  loading,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(totalItems / pagination.pageSize);
  const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const noResultsMessage = loading ? `Loading results...` : `No results found`;

  return (
    <div className={cn('flex items-center justify-between p-2 border-t', className)}>
      <div className={cn('text-sm text-muted-foreground', loading && 'animate-pulse')}>
        {totalItems === 0
          ? noResultsMessage
          : `Showing ${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems} results`}
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={pagination.pageSize.toString()}
            onValueChange={(value) => updatePagination((old) => ({ ...old, pageSize: Number(value), currentPage: 1 }))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
            onClick={() => updatePagination((old) => ({ ...old, currentPage: 1 }))}
            disabled={pagination.currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => updatePagination((old) => ({ ...old, currentPage: old.currentPage - 1 }))}
            disabled={pagination.currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent"
            onClick={() => updatePagination((old) => ({ ...old, currentPage: old.currentPage + 1 }))}
            disabled={totalPages === 0 || pagination.currentPage === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
            onClick={() => updatePagination((old) => ({ ...old, currentPage: totalPages }))}
            disabled={totalPages === 0 || pagination.currentPage === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DataTablePaginationProps {
  className?: string;
  pagination: PaginationState;
  updatePagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  totalItems: number;
  loading?: boolean;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}
