import { DevicesTable } from '@/components/devices-table';
import { getDevices } from '@/api';
import { Page } from '@/components/page';
import { Suspense } from 'react';

async function SuspendedPageContent({ params }: PageProps<'/[orgId]/suspended'>) {
  const { orgId } = await params;
  const devices = await getDevices(orgId);
  return (
    <Page title="Suspended Page">
      <DevicesTable data={devices} />
    </Page>
  );
}

export default async function SuspendedPage(props: PageProps<'/[orgId]/suspended'>) {
  return (
    <Suspense
      fallback={
        <Page title="Suspended Page">
          <DevicesTable data={[]} loading />
        </Page>
      }
    >
      <SuspendedPageContent {...props} />
    </Suspense>
  );
}
