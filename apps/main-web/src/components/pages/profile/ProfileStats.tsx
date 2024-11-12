import React, { Fragment } from 'react';

import { formatNumber } from '../../../utils/formatNumber';

const stats = [
  {
    id: 0,
    data: formatNumber(20),
    label: 'Posts',
  },
  {
    id: 1,
    data: formatNumber(10900000),
    label: 'Follower',
  },
  {
    id: 2,
    data: formatNumber(909000000),
    label: 'Following',
  },
];

export default function ProfileStats() {
  return (
    <ul className="flex gap-4">
      {stats.map((item) => {
        return (
          <Fragment key={item.id}>
            {item.id > 0 && (
              <li className="h-8 w-[1px] bg-[#D9D9D9]" aria-hidden="true" />
            )}
            <li className="flex flex-col items-center">
              <p className="font-semibold">{item.data}</p>
              <p className="text-sm text-[#838383]">{item.label}</p>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
