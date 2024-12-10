import React from 'react';
import { SearchContentUser } from '../../../types/search';

interface ResultItemProps {
  content: SearchContentUser;
}

export default function ResultItem({ content }: ResultItemProps) {
  return (
    <div>
      {content.nickname}@{content.tag}
    </div>
  );
}
