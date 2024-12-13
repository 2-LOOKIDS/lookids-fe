import { useEffect, useState } from 'react';

import Link from 'next/link';
import ProfileAvatar from '../../ui/ProfileAvatar';
import { UserInfo } from '../../../types/user';
import UserLink from './UserLink';
import { getUserProfile } from '../../../actions/user';

interface UserCardProps {
  uuid: string;
}

// export default function UserCard({ uuid }: UserCardProps) {
//   const data = await getUserProfile(uuid);

//   return <UserLink uuid={uuid} />;
// }

export default function UserCard({ uuid }: UserCardProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile(uuid);
        console.log(data);
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    fetchUserProfile();
  }, [uuid]);

  return (
    <>
      {/* <Link
        href={`${userInfo?.nickname}-${userInfo?.tag}`}
        className="flex items-center gap-2"
      >
        <ProfileAvatar
          className="h-10 w-10"
          imgUrl={userInfo?.image ?? ''}
          imgAlt={`${userInfo?.nickname}@${userInfo?.tag}`}
        />
        <p>
          {userInfo?.nickname}@{userInfo?.tag}
        </p>
      </Link> */}
      {userInfo ? <p>{userInfo?.nickname}</p> : <p>User not found</p>}
    </>
  );
}
