'use cache';

import { DataTable } from '@/components/data-table';
import { Device } from '@/types';

export async function CachedPageContent({ devices }: CachedPageContentProps) {
  return <DataTable data={devices} />;
}

interface CachedPageContentProps {
  devices: Device[];
}
