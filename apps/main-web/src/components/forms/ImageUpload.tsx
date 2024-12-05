import React, { useRef, useState } from 'react';

import { ImageUp } from 'lucide-react';
import { Input } from '@repo/ui/components/ui/input';
import ProfileAvatar from '../ui/ProfileAvatar';
import { useS3Upload } from 'next-s3-upload';

interface ImageUploadProps {
  onChange: (url: string) => void;
  initialImage?: string;
}

export default function ImageUpload({
  onChange,
  initialImage,
}: ImageUploadProps) {
  const { uploadToS3 } = useS3Upload();
  const [preview, setPreview] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }
    const url = await uploadToS3(file);
    const cdnUrl = `https://media.lookids.online/${url.key}`;
    setPreview(cdnUrl);
    console.log(typeof cdnUrl);
    onChange(cdnUrl);
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="relative">
      <ProfileAvatar
        className="h-[120px] w-[120px]"
        imgUrl={preview!}
        imgAlt={'profile'}
      />
      <div
        className="bg-lookids absolute bottom-1 right-1 z-[1] flex h-11 w-11 flex-row items-center justify-center gap-2.5 rounded-[16.5px] p-[5px] cursor-pointer"
        onClick={handleIconClick}
      >
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <ImageUp color="white" size={22} />
      </div>
    </div>
  );
}
