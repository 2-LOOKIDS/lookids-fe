import React from 'react';
import { SearchContentFeed } from '../../../types/search';

interface FeedResultListProps {
  result: SearchContentFeed[];
}

export function FeedResultList({ result }: FeedResultListProps) {
  return (
    <div>
      {result.map((item, idx) => {
        return <FeedResultItem key={idx} content={item} />;
      })}
    </div>
  );
}

interface FeedResultItemProps {
  content: SearchContentFeed;
}
function FeedResultItem({ content }: FeedResultItemProps) {
  return <div>{content.mediaUrlList}</div>;
}
