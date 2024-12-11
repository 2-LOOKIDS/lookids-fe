import Link from 'next/link';
import ProfileAvatar from '../../ui/ProfileAvatar';
import { SearchContentUser } from '../../../types/search';

interface UserResultListProps {
  result: SearchContentUser[];
  query: string;
}
export function UserResultList({ result, query }: UserResultListProps) {
  return (
    <ul className="px-5 pt-5 flex flex-col gap-3">
      {result.length === 0 ? (
        <li>
          <p>
            <span className="text-lookids">'{query}'</span> 검색어가 포함된
            닉네임을 가진 유저가 없습니다 ㅠ.ㅠ
          </p>
        </li>
      ) : (
        result.map((item, idx) => {
          return <UserResultItem key={idx} content={item} />;
        })
      )}
    </ul>
  );
}

interface UserResultItemProps {
  content: SearchContentUser;
}

function UserResultItem({ content }: UserResultItemProps) {
  return (
    <li>
      <Link
        href={`user/${content.nickname}-${content.tag}`}
        className="flex items-center gap-2"
      >
        <ProfileAvatar
          className="h-10 w-10"
          imgUrl={content.profileImage}
          imgAlt={`${content.nickname}@${content.tag}`}
        />
        <p>
          {content.nickname}@{content.tag}
        </p>
      </Link>
    </li>
  );
}
