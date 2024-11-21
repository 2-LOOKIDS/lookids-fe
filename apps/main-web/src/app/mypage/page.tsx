import AddPet from '../../components/pages/mypage/AddPet';
import EditDescription from '../../components/pages/mypage/EditDescription';
import EditNickName from '../../components/pages/mypage/EditNickName';
import EditPets from '../../components/pages/mypage/EditPets';
import EditProfileImage from '../../components/pages/mypage/EditProfileImage';
import React from 'react';
import SignOut from '../../components/pages/mypage/SignOut';
import { getServerSession } from 'next-auth';
import { getUserProfile } from '../../actions/user';
import { options } from '../api/auth/[...nextauth]/options';

export default async function page() {
  const data = await getServerSession(options);
  const uuid = data?.user.uuid;
  const userProfile = await getUserProfile(uuid);
  console.log('🚀 ~ page ~ res:', userProfile);
  return (
    <main className="">
      {/* 프로필 사진, 닉네임 변경 */}
      <section className="flex flex-col items-center justify-center px-4 py-5">
        <EditProfileImage
          imgUrl={userProfile.image}
          imgAlt={userProfile.nickname}
        />
        <EditNickName nickname={userProfile.nickname} tag={userProfile.tag} />
      </section>
      <div className="h-3 w-full bg-[#EBEBEB]"></div>
      {/* 소개글 변경 */}
      <section className="px-5 py-5">
        <EditDescription />
      </section>
      <div className="h-3 w-full bg-[#EBEBEB]"></div>
      {/* 마이펫 관리 */}
      <section className="flex flex-col gap-10 px-5 py-5">
        <EditPets />
        <AddPet />
      </section>
      <div className="h-3 w-full bg-[#EBEBEB]"></div>
      {/* 비밀번호 변경 페이지 이동 버튼 */}
      <section className="px-5 py-5"></section>
      {/* 로그아웃 버튼 */}
      {/* <SignOut /> */}
    </main>
  );
}
