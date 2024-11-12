import { Button } from '@repo/ui/components/ui/button';
import FeedList from '../../../components/pages/profile/FeedList';
import FollowButton from '../../../components/pages/profile/FollowButton';
import Header from '../../../components/pages/profile/Header';
import MessageButton from '../../../components/pages/profile/MessageButton';
import { Metadata } from 'next';
import PetList from '../../../components/pages/profile/PetList';
import ProfileAvatar from '../../../components/ui/ProfileAvatar';
import ProfileDescription from '../../../components/pages/profile/ProfileDescription';
import ProfileStats from '../../../components/pages/profile/ProfileStats';
import React, { Fragment } from 'react';
import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';

export async function generateMetadata({
  params,
}: {
  params: { loginId: string };
}): Promise<Metadata> {
  return {
    title: params.loginId,
    description: `${params.loginId}'s profile`,
  };
}

export default async function page({
  params,
}: {
  params: { loginId: string };
}) {
  const data = await getServerSession(options);
  return (
    <>
      <Header loginId={params.loginId} />
      <section>
        {/* 프로필 사진 */}
        {/* 피드수 팔로워수 팔로잉수 */}
      </section>
      <section>
        {/* 유저 이름 */}
        {/* 유저 아이디 */}
        {/* 소개글 */}
      </section>
      <section>
        {/* 팔로우 버튼 */}
        {/* 메세지 보내기 버튼 */}
      </section>

      <section>{/* 펫 프로필 */}</section>

      <section>{/* 피드 */}</section>

      <section className="flex items-center justify-between gap-6  px-5 pt-8">
        <ProfileAvatar
          // className="h-[80px] min-h-[80px] w-[80px] min-w-[80px] sm:h-[120px] sm:w-[120px]"
          className="h-[120px] min-h-[120px] w-[120px] min-w-[120px]"
          imgUrl={'/pome.jpg'}
          imgAlt={data?.user.name}
        />
        <ProfileStats />
      </section>
      <ProfileDescription />

      <section className="flex justify-center gap-4 px-4 pt-3.5">
        <FollowButton />
        <MessageButton />
      </section>

      <section className="flex flex-col items-center justify-center pt-6">
        <PetList />
        <FeedList />
      </section>
    </>
  );
}
