'use client';
import withAuth from '@/components/auth/withAuth';
import { ProfileBox } from '../../components/profile/ProfileBox';

function ProfilePage() {
  return (
    <div className="flex flex-row max-w-[100%] max-h-[100%]">
      <div className="flex flex-col items-center max-w-[100%] max-h-[100%]">
        <ProfileBox />
      </div>
    </div>
  );
}

export default withAuth(ProfilePage, 'profile');
