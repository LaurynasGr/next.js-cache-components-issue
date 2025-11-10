'use cache';

import { DevicesTable } from '@/components/devices-table';
import { Device } from '@/types';

export async function CachedPageContent({ devices }: CachedPageContentProps) {
  return <DevicesTable tableWrapperClassName="max-h-[calc(100vh-200px)]" data={devices} />;
}

interface CachedPageContentProps {
  devices: Device[];
}
