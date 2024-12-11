import {
  getPetList,
  getUserProfileByNicknameTag,
} from '../../../../actions/user';

import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { getFollowStatus } from '../../../../actions/follow/Follow';
import FeedList from '../../../../components/pages/profile/FeedList';
import FollowButton from '../../../../components/pages/profile/FollowButton';
import MessageButton from '../../../../components/pages/profile/MessageButton';
import PetList from '../../../../components/pages/profile/PetList';
import ProfileDescription from '../../../../components/pages/profile/ProfileDescription';
import ProfileHeader from '../../../../components/pages/profile/ProfileHeader';
import ProfileStats from '../../../../components/pages/profile/ProfileStats';
import ProfileAvatar from '../../../../components/ui/ProfileAvatar';
import { getMediaUrl } from '../../../../utils/media';
import { options } from '../../../api/auth/[...nextauth]/options';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `${decodeURIComponent(`${params.id}`)}`,
    description: `${decodeURIComponent(`${params.id}`)}'s profile`,
  };
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getServerSession(options);
  const [nickname, tag] = decodeURIComponent(params.id).split('-');
  console.log(nickname, tag);
  const userProfile = await getUserProfileByNicknameTag(nickname, tag);
  if (userProfile === null) {
    notFound();
  }
  const imgUrl = getMediaUrl(userProfile.image);
  const followStatus = await getFollowStatus(data?.user.uuid, userProfile.uuid);
  const petList = await getPetList(userProfile.uuid);

  return (
    <>
      <ProfileHeader
        loginId={decodeURIComponent(params.id)}
        uuid={userProfile.uuid}
      />
      <main>
        <section>
          <div className="flex items-center justify-between px-5 pt-8">
            <ProfileAvatar
              className="xs:h-[120px] xs:w-[120px] h-[100px] min-h-[80px] w-[100px] min-w-[80px]"
              imgUrl={imgUrl}
              imgAlt={userProfile.nickname}
            />
            <ProfileStats uuid={userProfile.uuid} />
          </div>

          <ProfileDescription comment={userProfile.comment} />

          <div className="flex justify-center gap-4 px-4 pt-10">
            <FollowButton
              token={data?.user.accessToken}
              uuid={data?.user.uuid}
              targetUuid={userProfile.uuid}
              followStatus={followStatus}
            />
            <MessageButton />
          </div>
        </section>

        <section className="pt-10">
          <PetList petList={petList} />
        </section>

        <section className="flex flex-col items-center justify-center px-4 pt-9">
          <FeedList uuid={userProfile.uuid} />
        </section>
      </main>
    </>
  );
}
