import { SearchContentUser } from '../../../types/search';

interface UserResultListProps {
  result: SearchContentUser[];
}
export function UserResultList({ result }: UserResultListProps) {
  return (
    <div>
      {result.map((item, idx) => {
        return <UserResultItem key={idx} content={item} />;
      })}
    </div>
  );
}

interface UserResultItemProps {
  content: SearchContentUser;
}

function UserResultItem({ content }: UserResultItemProps) {
  return (
    <div>
      {content.nickname}@{content.tag}
    </div>
  );
}
