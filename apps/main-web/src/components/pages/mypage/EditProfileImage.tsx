'use client';

import React, { useRef, useState } from 'react';

import { ImageUp } from 'lucide-react';
import ProfileAvatar from '../../ui/ProfileAvatar';
import { useS3Upload } from 'next-s3-upload';

interface EditProfileImageProps {
  imgUrl: string;
  imgAlt: string;
}
export default function EditProfileImage({
  imgUrl,
  imgAlt,
}: EditProfileImageProps) {
  if (imgUrl === '기본 이미지') {
    imgUrl = '/jihunpistol.jpg';
  }
  const [newImgUrl, setNewimgUrl] = useState<string>(imgUrl);
  const { uploadToS3 } = useS3Upload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];
    if (!newImage) {
      return;
    }

    let url = await uploadToS3(newImage);
    const cdnurl = `https://media.lookids.online/${url.key}`;
    setNewimgUrl(cdnurl);
  };
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <ProfileAvatar
        className="h-[162px] w-[162px]"
        imgUrl={newImgUrl}
        imgAlt={imgAlt}
      />
      <div
        className="bg-lookids absolute bottom-1 right-1 z-[1] flex h-11 w-11 flex-row items-center justify-center gap-2.5 rounded-[16.5px] p-[5px]"
        onClick={handleIconClick}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <ImageUp color="white" size={22} />
      </div>
    </div>
  );
}
