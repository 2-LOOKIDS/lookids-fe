// utils/s3Utils.ts
import { useS3Upload } from 'next-s3-upload';

export const useS3Uploader = () => {
  const { uploadToS3 } = useS3Upload();

  const uploadImage = async (file: File): Promise<string> => {
    const result = await uploadToS3(file);
    return `https://media.lookids.online/${result.key}`;
  };

  return { uploadImage };
};
