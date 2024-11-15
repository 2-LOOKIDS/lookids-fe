'use client';

import UserLikesTab from './UserLikesTab';
import UserPostsTab from './UserPostsTab';
import { useState } from 'react';

function FeedList() {
  const [tab, setTab] = useState<string>('posts');

  return (
    <>
      <div className="flex w-full justify-center gap-4 px-4">
        <div onClick={() => setTab('posts')}>
          <UserPostsTab />
        </div>
        <div onClick={() => setTab('likes')}>
          <UserLikesTab />
        </div>
      </div>
    </>
  );
}

export default FeedList;
