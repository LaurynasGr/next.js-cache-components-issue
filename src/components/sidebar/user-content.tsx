import { getUserInfo } from '@/api';
import { LogOutIcon } from 'lucide-react';
import { Suspense } from 'react';

function UserContentComponent({ user }: { user: Awaited<ReturnType<typeof getUserInfo>> | null }) {
  return (
    <div className="mt-auto p-2 flex gap-2 items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <div className="text-sm leading-none font-semibold">{user?.name ?? '***** *****'}</div>
        <div className="text-xs leading-none">{user?.email ?? '**********'}</div>
      </div>
      <LogOutIcon className="size-4 opacity-50 cursor-not-allowed" />
    </div>
  );
}

export async function SuspendedUserContent() {
  return (
    <Suspense fallback={<UserContentComponent user={null} />}>
      <UserContent />
    </Suspense>
  );
}

export async function UserContent() {
  const userInfo = await getUserInfo();
  return <UserContentComponent user={userInfo} />;
}
