import ProfileAvatar from '../../ui/ProfileAvatar';
import React from 'react';

const petList = [
  { id: 0, name: '전체', imgUrl: '' },
  { id: 1, name: '신지훈1', imgUrl: '/jihoon3.png' },
  { id: 2, name: '신지훈2', imgUrl: '/jihoon.jpg' },
  { id: 3, name: '신지훈3', imgUrl: '/jihunpistol.jpg' },
  { id: 4, name: '신지훈4', imgUrl: '/jihoon4.jpg' },
  { id: 5, name: '박상언1', imgUrl: '/sangeun.jpg' },
];

function PetList() {
  return (
    <ul className="flex gap-1">
      {petList.map((item) => {
        return (
          <li key={item.id}>
            <ProfileAvatar
              imgUrl={item.imgUrl}
              w={'12'}
              h={'12'}
              name={item.name}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default PetList;
