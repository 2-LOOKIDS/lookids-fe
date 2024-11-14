'use client';
import { useS3Upload } from 'next-s3-upload';
import React from 'react';

export default function Page() {
  const { uploadToS3 } = useS3Upload();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log('파일', file);
    if (file) {
      const { url } = await uploadToS3(file);
      console.log('Successfully uploaded to S3!', url);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
