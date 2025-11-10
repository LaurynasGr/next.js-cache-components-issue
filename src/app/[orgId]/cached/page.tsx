import { Suspense } from 'react';
import { DevicesTable } from '@/components/devices-table';
import { geCachedDevices } from '@/api';
import { Page } from '@/components/page';
import { CachedPageContent } from './content';

async function SuspendedCachedPage({ params }: PageProps<'/[orgId]/cached'>) {
  const { orgId } = await params;
  const devices = await geCachedDevices(orgId);
  return (
    <Page title="Cached Page">
      <CachedPageContent devices={devices} />
    </Page>
  );
}

export default async function CachedPage(props: PageProps<'/[orgId]/cached'>) {
  return (
    <Suspense
      fallback={
        <Page title="Cached Page">
          <DevicesTable data={[]} loading />
        </Page>
      }
    >
      <SuspendedCachedPage {...props} />
    </Suspense>
  );
}
