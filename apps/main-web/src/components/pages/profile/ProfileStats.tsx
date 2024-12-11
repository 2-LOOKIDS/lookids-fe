import { Fragment } from 'react';
import {
  Counting,
  FollowCount,
  getFeedCount,
  getFollowCount,
} from '../../../actions/batch/batch';
import { formatNumber } from '../../../utils/formatNumber';

export default async function ProfileStats({ uuid }: { uuid: string }) {
  const followerData: FollowCount = await getFollowCount(uuid);
  const postData: Counting = await getFeedCount(uuid);

  const stats = [
    {
      id: 0,
      data: formatNumber(postData.count),
      label: 'Posts',
    },
    {
      id: 1,
      data: formatNumber(followerData.followerCount),
      label: 'Follower',
    },
    {
      id: 2,
      data: formatNumber(followerData.followingCount),
      label: 'Following',
    },
  ];

  return (
    <ul className="flex gap-4">
      {stats.map((item) => {
        return (
          <Fragment key={item.id}>
            {item.id > 0 && (
              <li className="h-8 w-[1px] bg-[#D9D9D9]" aria-hidden="true" />
            )}
            <li className="flex flex-col items-center">
              <p className="xs:text-base text-sm font-semibold">{item.data}</p>
              <p className="xs:text-sm text-xs text-[#838383]">{item.label}</p>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
