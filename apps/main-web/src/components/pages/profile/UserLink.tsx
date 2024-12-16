import Link from 'next/link';
import ProfileAvatar from '../../ui/ProfileAvatar';
import React from 'react';
import { UserInfo } from '../../../types/user';
import { getUserProfile } from '../../../actions/user';

interface UserLinkProps {
  uuid: string;
}
export default async function UserLink({ uuid }: UserLinkProps) {
  const userProfile = await getUserProfile(uuid);
  return (
    <div>{userProfile.nickname}</div>
    // <Link
    //   href={`user/${userInfo.nickname}-${userInfo.tag}`}
    //   className="flex items-center gap-2"
    // >
    //   <ProfileAvatar
    //     className="h-10 w-10"
    //     imgUrl={userInfo.image}
    //     imgAlt={`${userInfo.nickname}@${userInfo.tag}`}
    //   />
    //   <p>
    //     {userInfo.nickname}@{userInfo.tag}
    //   </p>
    // </Link>
  );
}
// interface UserLinkProps {
//   userInfo: UserInfo;
// }
// export default function UserLink({ userInfo }: UserLinkProps) {
//   return (
//     <Link
//       href={`user/${userInfo.nickname}-${userInfo.tag}`}
//       className="flex items-center gap-2"
//     >
//       <ProfileAvatar
//         className="h-10 w-10"
//         imgUrl={userInfo.image}
//         imgAlt={`${userInfo.nickname}@${userInfo.tag}`}
//       />
//       <p>
//         {userInfo.nickname}@{userInfo.tag}
//       </p>
//     </Link>
//   );
// }
