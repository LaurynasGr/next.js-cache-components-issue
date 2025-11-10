import { SidebarToggle } from './sidebar/content';

export async function Page({ title, children }: PageProps) {
  return (
    <div className="p-6 h-full flex flex-col flex-1 gap-4 overflow-auto">
      <h2 className="text-xl font-bold flex gap-2 items-center">
        <SidebarToggle />
        {title}
      </h2>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

interface PageProps extends React.PropsWithChildren {
  title: React.ReactNode;
}
