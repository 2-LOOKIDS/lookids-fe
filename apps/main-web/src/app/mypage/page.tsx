import EditNickName from '../../components/pages/mypage/EditNickName';
import EditProfileImage from '../../components/pages/mypage/EditProfileImage';
import React from 'react';
import { getServerSession } from 'next-auth';
import { getUserProfile } from '../../actions/user';
import { options } from '../api/auth/[...nextauth]/options';

export default async function page() {
  const data = await getServerSession(options);
  const uuid = data?.user.uuid;
  const userProfile = await getUserProfile(uuid);
  console.log('🚀 ~ page ~ res:', userProfile);
  return (
    <main>
      {/* 프로필 사진, 닉네임 변경 */}
      <section className="flex flex-col items-center justify-center px-4 pt-5">
        <EditProfileImage
          imgUrl={userProfile.image}
          imgAlt={userProfile.nickname}
        />
        <EditNickName />
      </section>
      {/* 소개글 변경 */}
      <section></section>
      {/* 마이펫 관리 */}
      <section></section>
      {/* 비밀번호 변경 페이지 이동 버튼 */}
      <section></section>
    </main>
  );
}
