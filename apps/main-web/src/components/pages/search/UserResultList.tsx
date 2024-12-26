'use client';

import { useRouter } from 'next/navigation';
import { SearchContentUser } from '../../../types/search';
import ProfileAvatar from '../../ui/ProfileAvatar';

interface UserResultListProps {
  result: SearchContentUser[];
  query: string;
}

export function UserResultList({ result, query }: UserResultListProps) {
  return result.length === 0 ? (
    <p className="px-5 pt-5">
      <span className="text-lookids">'{query}'</span> 가 포함된 닉네임을 가진
      유저가 없습니다 ㅠ.ㅠ
    </p>
  ) : (
    <ul className="px-5 pt-5 flex flex-col gap-3">
      {result.map((item, idx) => {
        return <UserResultItem key={idx} content={item} />;
      })}
    </ul>
  );
}

interface UserResultItemProps {
  content: SearchContentUser;
}

function UserResultItem({ content }: UserResultItemProps) {
  const router = useRouter();
  return (
    <li
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push(`user/${content.nickname}-${content.tag}`)}
    >
      <ProfileAvatar
        className="h-10 w-10"
        imgUrl={content.profileImage}
        imgAlt={`${content.nickname}@${content.tag}`}
      />
      <p>
        {content.nickname}@{content.tag}
      </p>
    </li>
  );
}
