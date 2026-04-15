'use client';

import withAuth from '@/components/auth/withAuth';
import Navbar from '@/components/common/Navbar';
import { VideoPage } from '@/components/VideoPage';

function Page() {
  return (
    <div className="flex flex-row w-[inherit] h-[100%]">
      <Navbar />
      <VideoPage />
    </div>
  );
}

export default withAuth(Page, 'root');
