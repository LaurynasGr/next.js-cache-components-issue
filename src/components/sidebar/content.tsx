'use client';

import { Building2Icon, PanelLeftIcon } from 'lucide-react';
import { cn } from '@/lib/classnames';
import { useSidebar } from './context/context';
import { Link } from '../link';

export function SidebarToggle() {
  const { toggle } = useSidebar();
  return (
    <button className="cursor-pointer" onClick={toggle}>
      <PanelLeftIcon className="size-5" />
    </button>
  );
}

export function Sidebar({ children }: React.PropsWithChildren) {
  const { open, rendered } = useSidebar();
  if (!rendered) return null;
  return (
    <aside className={cn('w-64 h-full transition-[width] ease-in-out overflow-hidden', !open && 'w-0')}>
      <div className="bg-gray-800 text-white p-2 h-full w-64 flex flex-col">
        <h2 className="text-xl font-bold mb-2 flex gap-2 items-center p-2">
          <Building2Icon className="size-5" />
          Organization
        </h2>
        <nav className="[&>a]:p-2 [&>a]:block [&>a]:transition-colors [&>a]:rounded [&>a[data-active]]:bg-gray-700/90 [&>a]:hover:bg-gray-700/50">
          <Link href="/1/suspended" className="p-2 block" router>
            Devices (Suspended)
          </Link>
          <Link href="/1/cached" className="p-2 block" router>
            Devices (Cached)
          </Link>
        </nav>
        {children}
      </div>
    </aside>
  );
}
