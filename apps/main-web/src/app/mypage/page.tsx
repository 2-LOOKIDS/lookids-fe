import AddPet from '../../components/pages/mypage/AddPet';
import { EditDialog } from '../../components/pages/mypage/EditDialog';
import EditPassword from '../../components/pages/mypage/EditPassword';
import EditPets from '../../components/pages/mypage/EditPets';
import EditProfileImage from '../../components/pages/mypage/EditProfileImage';
import Hr from '../../components/common/Hr';
import SignOut from '../../components/pages/mypage/SignOut';
import { getServerSession } from 'next-auth';
import { getUserProfile } from '../../actions/user';
import { options } from '../api/auth/[...nextauth]/options';

export default async function page() {
  const data = await getServerSession(options);
  const uuid = data?.user.uuid;
  const userProfile = await getUserProfile(uuid);
  console.log('🚀 ~ page ~ uuid:', uuid);
  console.log('🚀 ~ page ~ res:', userProfile);
  return (
    <main className="">
      {/* 프로필 사진, 닉네임 변경 */}
      <section className="flex flex-col items-center justify-center px-4 py-5">
        <EditProfileImage
          imgUrl={userProfile.image}
          imgAlt={userProfile.nickname}
        />

        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="font-semibold">
            {userProfile.nickname}#{userProfile.tag}
          </p>
          <EditDialog
            type={'userProfile'}
            fields={[
              { label: '닉네임', field: 'nickname' },
              {
                label: '성별',
                field: 'gender',
              },
            ]}
            defaultValues={{
              nickname: userProfile.nickname,
              gender: '성별 선택',
            }}
          />
        </div>
      </section>
      <Hr />
      {/* 소개글 변경 */}
      <section className="px-5 py-5">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">내 소개글</p>
          <p className="text-grey text-xs">{userProfile.comment}</p>
          <div className="flex justify-start">
            <EditDialog
              type={'userComment'}
              fields={[{ label: '소개글', field: 'comment' }]}
              defaultValues={{ comment: userProfile.comment }}
            />
          </div>
        </div>
      </section>
      <Hr />
      {/* 마이펫 관리 */}
      <section className="flex flex-col gap-1 py-5">
        <EditPets />
        <AddPet />
      </section>
      <Hr />
      {/* 비밀번호 변경 페이지 이동 버튼 */}
      <section className="px-5 py-5">
        <EditPassword />
      </section>
      {/* 로그아웃 버튼 */}
      <SignOut />
    </main>
  );
}
