import { UserRelationshipDto } from '@/api/api';
import { useContext } from 'react';
import { ApiContext } from '../../app/_internal/provider/ApiContext';
import { CommonCard } from './utils/CommonCard';

interface SearchCardProps {
  readonly data: UserRelationshipDto;
  readonly refetch: () => Promise<unknown>;
}

export function SearchCard({ data, refetch }: SearchCardProps) {
  const { api } = useContext(ApiContext);

  return (
    <CommonCard
      imageUrl={data.profileImageUrl}
      nickname={data.nickname}
      id={data.id}
      refetch={refetch}
      firstName="Etienne"
      lastName="LEE"
    >
      <></>
    </CommonCard>
  );
}
