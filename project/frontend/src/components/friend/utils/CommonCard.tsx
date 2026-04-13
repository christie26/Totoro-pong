import { ReactNode } from 'react';
import FriendAvatar from './FriendAvatar';

interface CommonCardProps {
  readonly children: ReactNode;
  readonly imageUrl?: string;
  readonly nickname: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly id: string;
  readonly refetch: () => Promise<unknown>;
}

export function CommonCard({
  children,
  imageUrl,
  nickname,
  id,
  firstName,
  lastName,
  refetch,
}: CommonCardProps) {
  const sizeCSS = 'w-[600px] h-[100px]';
  const colorCSS = 'bg-white border-3 border-default rounded-md';
  const alignCSS = 'flex items-center relative p-md';
  return (
    <div className={`${sizeCSS} ${colorCSS} ${alignCSS}`}>
      <FriendAvatar imageUrl={imageUrl} size={60} />
      <div className="flex flex-col absolute left-[100px]">
        <div className="text-left text-black text-h3  font-light font-agro">
          {nickname}
        </div>
        <div className="text-left text-black text-md font-light">
          {firstName} {lastName}
        </div>
      </div>
      <div className="absolute right-xl flex items-center">{children}</div>
      {/* <ProfileModal
        isOpen={isProfileOpen}
        onClose={handleProfileClose}
        targetId={id}
        refetchPage={refetch}
        openInvite={handleInviteOpen}
        setGameMode={toggleGameMode}
      /> */}
    </div>
  );
}
