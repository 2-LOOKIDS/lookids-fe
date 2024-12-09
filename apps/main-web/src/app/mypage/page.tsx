import { getPetList, getUserProfile } from '../../actions/user';

import AddPet from '../../components/pages/mypage/AddPet';
import { EditDialog } from '../../components/pages/mypage/EditDialog';
import EditPassword from '../../components/pages/mypage/EditPassword';
import { EditPetButton } from '../../components/pages/profile/PetList';
import EditPets from '../../components/pages/mypage/EditPets';
import EditProfileImage from '../../components/pages/mypage/EditProfileImage';
import EditUserProfileForm from '../../components/pages/mypage/EditUserProfileForm';
import FeedList from '../../components/pages/profile/FeedList';
import Hr from '../../components/common/Hr';
import InputFormDialog from '../../components/forms/InputFormDialog';
import SignOut from '../../components/pages/mypage/SignOut';
import { formatDateString } from '../../utils/formatDate';
import { getMediaUrl } from '../../utils/media';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function page() {
  const data = await getServerSession(options);
  const token = data?.user.accessToken;
  const uuid = data?.user.uuid;
  const userProfile = await getUserProfile(uuid);
  const profileImage = getMediaUrl(userProfile.image);
  const petList = await getPetList(uuid);
  const comment = userProfile.comment ?? '소개글을 작성해주세요!';
  const userBirthDate = formatDateString(userProfile.birthDate);
  // const userBirthDate = formatDateString(userProfile.birthDate ?? '0000-00-00');
  console.log(userProfile.birthDate);
  return (
    <main className="">
      {/* 프로필 사진, 닉네임 변경 */}
      <section className="flex flex-col items-center justify-center px-4 py-5">
        <EditProfileImage
          imgUrl={profileImage}
          imgAlt={userProfile.nickname}
          uuid={uuid}
          token={token}
        />

        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="font-semibold">
            {userProfile.nickname}@{userProfile.tag}
          </p>
          <InputFormDialog
            TriggerComponent={<EditPetButton />}
            FormComponent={EditUserProfileForm}
            formProps={{
              defaultValues: {
                nickname: userProfile.nickname,
                birthDate: userBirthDate,
                gender: userProfile.gender,
              },
            }}
          />

          {/* <EditDialog
            uuid={uuid}
            token={token}
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
          /> */}
        </div>
      </section>
      <Hr />
      {/* 소개글 변경 */}
      <section className="px-5 py-5">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">내 소개글</p>
          <p className="text-grey text-xs">{comment}</p>
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
        <EditPets petList={petList} />
        <AddPet />
      </section>
      <Hr />
      {/* 피드 썸네일 리스트 */}

      <section className="flex flex-col gap-1 py-5">
        <FeedList uuid={uuid} />
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
