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
import React from 'react';
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
    <main>
      <Header loginId={params.loginId} />
      <section className="flex flex-col items-center pt-8">
        <ProfileAvatar
          imgUrl={'/hunjin.png'}
          w={'[120px]'}
          h={'[120px]'}
          name={data?.user.name}
        />
        <ProfileStats />
        <ProfileDescription />
      </section>

      <section className="flex justify-center gap-4 px-4 pt-3.5">
        <FollowButton />
        <MessageButton />
      </section>

      <section className="flex flex-col items-center justify-center pt-6">
        <PetList />
        <FeedList />
      </section>
    </main>
  );
}
