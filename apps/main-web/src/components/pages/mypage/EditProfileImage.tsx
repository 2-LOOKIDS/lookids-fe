'use client';

import React, { useRef } from 'react';

import { ImageUp } from 'lucide-react';
import ProfileAvatar from '../../ui/ProfileAvatar';
import { updateProfileImage } from '../../../actions/user';
import { useS3Upload } from 'next-s3-upload';

interface EditProfileImageProps {
  imgUrl: string;
  imgAlt: string;
  uuid: string;
  token: string;
}
export default function EditProfileImage({
  imgUrl,
  imgAlt,
  uuid,
  token,
}: EditProfileImageProps) {
  imgUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL + imgUrl;
  const { uploadToS3 } = useS3Upload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];
    if (!newImage) {
      return;
    }

    let url = await uploadToS3(newImage);
    const cdnurl = `https://media.lookids.online/${url.key}`;
    await updateProfileImage(uuid, token, cdnurl);
    console.log(token);
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
        imgUrl={imgUrl}
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
