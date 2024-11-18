import FeedList from '../../../components/pages/profile/FeedList';
import FollowButton from '../../../components/pages/profile/FollowButton';
import MessageButton from '../../../components/pages/profile/MessageButton';
import { Metadata } from 'next';
import PetList from '../../../components/pages/profile/PetList';
import ProfileAvatar from '../../../components/ui/ProfileAvatar';
import ProfileDescription from '../../../components/pages/profile/ProfileDescription';
import ProfileHeader from '../../../components/pages/profile/ProfileHeader';
import ProfileStats from '../../../components/pages/profile/ProfileStats';
import { getServerSession } from 'next-auth';
import { options } from '../../api/auth/[...nextauth]/options';

export async function generateMetadata({
  params,
}: {
  params: { loginId: string };
}): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.loginId),
    description: `${decodeURIComponent(params.loginId)}'s profile`,
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
      <ProfileHeader loginId={decodeURIComponent(params.loginId)} />
      <main>
        <section>
          <div className="flex items-center justify-between px-5 pt-8">
            <ProfileAvatar
              className="xs:h-[120px] xs:w-[120px] h-[100px] min-h-[80px] w-[100px] min-w-[80px]"
              imgUrl={'/pome.jpg'}
              imgAlt={data?.user.name}
            />
            <ProfileStats />
          </div>

          <ProfileDescription />

          <div className="flex justify-center gap-4 px-4 pt-10">
            <FollowButton />
            <MessageButton />
          </div>
        </section>

        <section>
          <PetList />
        </section>

        <section className="flex flex-col items-center justify-center px-4 pt-9">
          <FeedList />
        </section>
      </main>
    </>
  );
}
