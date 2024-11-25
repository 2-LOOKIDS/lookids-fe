'use client';
import { Button } from '@repo/ui/components/ui/button';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { useImage } from '../../../context/ImageContext';
import { extractGpsData } from '../../../utils/exifUtil';
import { useS3Uploader } from '../../../utils/s3Utils';
import ImageList from './ImageList';

export default function ImageUpload() {
  const { images, setImages } = useImage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useS3Uploader();

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);

      for (const file of newImages) {
        try {
          const gpsData = await extractGpsData(file);
          const url = await uploadImage(file);

          setImages((prev) => [
            ...prev,
            {
              mediaUrl: url,
              mediaType: 'image',
              latitude: gpsData.latitude,
              longitude: gpsData.longitude,
            },
          ]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2">
        <ImageList images={images} removeImage={removeImage} />
        {images.length < 5 && (
          <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
              multiple
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="rounded-full"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
