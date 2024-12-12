import FeedList from '../profile/FeedList';
import FeedThumbnail from '../profile/FeedThumbnail';
import React from 'react';
import { SearchContentFeed } from '../../../types/search';

interface FeedResultListProps {
  result: SearchContentFeed[];
  query: string;
}

export function FeedResultList({ result, query }: FeedResultListProps) {
  return result.length === 0 ? (
    <p className="px-5 pt-5">
      <span className="text-lookids">'{query}'</span> 태그가 포함된 피드가
      없습니다 ㅠ.ㅠ
    </p>
  ) : (
    <ul className="flex w-full justify-center pt-1">
      <div className="grid w-full grid-cols-3 gap-1">
        {result.map((item, idx) => {
          return (
            <FeedThumbnail
              key={idx}
              feedCode={item.feedCode}
              imgUrl={item.mediaUrlList?.[0]}
              imgAlt={item.feedCode}
            />
          );
        })}
      </div>
    </ul>
  );
}

interface FeedResultItemProps {
  content: SearchContentFeed;
}
function FeedResultItem({ content }: FeedResultItemProps) {
  return <></>;
}
