'use client';

import withAuth from '@/components/auth/withAuth';
import Navbar from '@/components/common/Navbar';
import { useTranslation } from 'react-i18next';

function Page() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row w-[inherit] h-[100%]">
      <Navbar />
      main page where we will see Thumbnails
    </div>
  );
}

export default withAuth(Page, 'root');
