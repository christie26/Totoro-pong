'use client';

import withAuth from '@/components/auth/withAuth';
import { NavbarLayout } from '@/components/common/NavbarLayout';
import { VideoPage } from '@/components/video/VideoPage';

function Page() {
  return (
    <div className="flex flex-row w-[inherit] h-[100%]">
      <NavbarLayout>
        <VideoPage />
      </NavbarLayout>
    </div>
  );
}

export default withAuth(Page, 'root');
