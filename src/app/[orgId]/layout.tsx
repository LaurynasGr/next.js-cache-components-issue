import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { SidebarProvider, UserContent, Sidebar } from '@/components/sidebar';

function SidebarContent({ children, defaultOpen }: React.PropsWithChildren & { defaultOpen: boolean }) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar>
        {/* For cacheComponents: true, we need to use `SuspendedUserContent` instead of `UserContent` */}
        <UserContent />
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}

async function SidebarWrapper({ children }: React.PropsWithChildren) {
  const cookieStore = await cookies();
  const sidebarCookie = cookieStore.get('sidebar-open');

  return (
    <SidebarContent defaultOpen={sidebarCookie ? sidebarCookie.value === 'true' : true}>{children}</SidebarContent>
  );
}

export async function SuspendedSidebarWrapper({ children }: React.PropsWithChildren) {
  return (
    <Suspense fallback={<SidebarContent defaultOpen>{children}</SidebarContent>}>
      <SidebarWrapper>{children}</SidebarWrapper>
    </Suspense>
  );
}

export default function Layout({ children }: LayoutProps<'/[orgId]'>) {
  return (
    <main className="flex h-screen">
      {/* For cacheComponents: true, we need to use `SuspendedSidebarWrapper` instead of `SidebarWrapper` */}
      <SidebarWrapper>{children}</SidebarWrapper>
    </main>
  );
}
