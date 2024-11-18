'use client';

import { useState } from 'react';
import FeedThumbnail from './FeedThumbnail';
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

  const images = [
    { id: 0, imgAlt: 'jihun', imgSrc: '/jihunpistol.jpg' },
    { id: 1, imgAlt: 'poem', imgSrc: '/pome.jpg' },
    { id: 2, imgAlt: 'jihun', imgSrc: '/jihunpistol.jpg' },
    { id: 3, imgAlt: 'poem', imgSrc: '/pome.jpg' },
    { id: 4, imgAlt: 'jihun', imgSrc: '/jihunpistol.jpg' },
    { id: 5, imgAlt: 'poem', imgSrc: '/pome.jpg' },
    { id: 6, imgAlt: 'jihun', imgSrc: '/jihunpistol.jpg' },
    { id: 7, imgAlt: 'poem', imgSrc: '/pome.jpg' },
    { id: 8, imgAlt: 'jihun', imgSrc: '/jihunpistol.jpg' },
    { id: 9, imgAlt: 'poem', imgSrc: '/pome.jpg' },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);
  return (
    <>
      <ul className="flex w-full justify-center gap-4">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className="flex-1"
            onClick={() => setActiveTab(tab.label)}
          >
            {/* TODO: headers()로 구현해보자! */}
            <tab.component isActive={activeTab === tab.label} />
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center pt-4">
        <div className="grid w-full grid-cols-3 gap-1">
          {images.map((item) => (
            <FeedThumbnail
              key={item.id}
              imgAlt={item.imgAlt}
              imgUrl={item.imgSrc}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default FeedList;
