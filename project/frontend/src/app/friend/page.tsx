'use client';
import withAuth from '@/components/auth/withAuth';
import { SearchCardList } from '../../components/friend/SearchCardList';

function FriendPage() {
  return (
    <div className="flex flex-row w-[100%] h-[100%]">
      <div className="w-[100%] h-[100%] bg-light-background rounded-lg">
        <div className="flex flex-col items-center w-inherit h-inherit overflow-hidden p-md">
          <SearchCardList />
        </div>
      </div>
    </div>
  );
}

export default withAuth(FriendPage, 'friend');
