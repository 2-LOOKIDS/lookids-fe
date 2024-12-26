import { getPetList, getUserProfile } from '../../actions/user';

import AddPet from '../../components/pages/mypage/AddPet';
import EditCommentForm from '../../components/pages/mypage/EditCommentForm';
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
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

export default async function page() {
  const data = await getServerSession(options);
  const token = data?.user.accessToken;
  const uuid = data?.user.uuid;
  const userProfile = await getUserProfile(uuid);
  const petList = await getPetList(uuid);
  const comment = userProfile.comment ?? '소개글을 작성해주세요!';
  const userBirthDate = formatDateString(userProfile.birthDate);
  return (
    <main>
      <section className="flex flex-col items-center justify-center px-4 pt-2">
        <EditProfileImage
          imgUrl={userProfile.image}
          imgAlt={userProfile.nickname}
          uuid={uuid}
          token={token}
        />

        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="font-semibold flex">
            <p>{userProfile.nickname}-</p>
            <p>{userProfile.tag}</p>
          </div>
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
        </div>
      </section>
      <Hr />
      <section className="px-5 py-5">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">내 소개글</p>
          <p className="text-grey">{comment}</p>
          <div className="flex justify-start">
            <InputFormDialog
              TriggerComponent={<EditPetButton />}
              FormComponent={EditCommentForm}
              formProps={{
                comment,
              }}
            />
          </div>
        </div>
      </section>
      <Hr />
      <section className="flex flex-col gap-1 py-5">
        <EditPets petList={petList} />
        <AddPet />
      </section>
      <Hr />

      <section className="flex flex-col gap-1 py-5">
        <FeedList uuid={uuid} />
      </section>
      <Hr />

      <section className="px-5 py-5">
        <EditPassword />
      </section>
      <SignOut />
    </main>
  );
}
