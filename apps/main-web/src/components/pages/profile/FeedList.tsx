'use client';

import { act, useState } from 'react';

import UserLikesTab from './UserLikesTab';
import UserPostsTab from './UserPostsTab';

interface Tab {
  id: number;
  label: string;
  component: ({ isActive }: { isActive: boolean }) => JSX.Element;
}

function FeedList() {
  const tabs: Tab[] = [
    {
      id: 0,
      label: 'posts',
      component: ({ isActive }) => <UserPostsTab isActive={isActive} />,
    },
    {
      id: 1,
      label: 'likes',
      component: ({ isActive }) => <UserLikesTab isActive={isActive} />,
    },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  return (
    <>
      <ul className="flex w-full justify-center gap-4 px-4">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className="flex-1"
            onClick={() => setActiveTab(tab.label)}
          >
            <tab.component isActive={activeTab === tab.label} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default FeedList;
