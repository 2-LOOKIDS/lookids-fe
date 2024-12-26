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
  return <div>{userProfile.nickname}</div>;
}
