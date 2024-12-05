'use client';

import ImageUpload from '../../../components/pages/mypage/add-pet/ImageUpload';

export default function page() {
  return (
    <main className="px-5 pt-5">
      {/* 이미지 업로드 */}
      <section className="flex flex-col items-center">
        <ImageUpload />
      </section>
      {/* 펫 프로필 */}
      <section></section>
      <div className="border-lookids border-2 rounded-sm">asdfasdfasdf</div>
    </main>
  );
}
