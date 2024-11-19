'use client';
import { Button } from '@repo/ui/components/ui/button';
import EXIF from 'exif-js';
import { Plus, X } from 'lucide-react';
import { useS3Upload } from 'next-s3-upload';
import Image from 'next/image';
import { useRef } from 'react';
import { useImage } from '../../../context/ImageContext';

export default function ImageUpload() {
  const { images, setImages } = useImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  let { uploadToS3 } = useS3Upload();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);

      for (const file of newImages) {
        try {
          let calcullong = 0,
            calculat = 0;
          let hasGpsData = false;
          const reader = new FileReader();
          reader.onload = function (event) {
            const dataURL = event.target?.result as string;

            // Blob URL을 img 요소에 로드하여 EXIF 데이터 추출
            const img = document.createElement('img') as HTMLImageElement;
            img.src = dataURL;

            img.onload = function () {
              EXIF.getData(img as any, function (this: HTMLImageElement) {
                let altitudeData = EXIF.getTag(this, 'GPSAltitude');
                let longitudeData = EXIF.getTag(this, 'GPSLongitude');
                let latitudeData = EXIF.getTag(this, 'GPSLatitude');

                if (longitudeData && latitudeData) {
                  hasGpsData = true;
                  calcullong =
                    longitudeData[0] +
                    longitudeData[1] / 60 +
                    longitudeData[2] / 3600;
                  calculat =
                    latitudeData[0] +
                    latitudeData[1] / 60 +
                    latitudeData[2] / 3600;
                }
              });
            };
          };
          reader.readAsDataURL(file); // Data URL 형식으로 파일 읽기

          let url = await uploadToS3(file);
          const cdnurl = `https://media.lookids.online/${url.key}`;

          setImages((prev) => [
            ...prev,
            hasGpsData
              ? {
                  mediaUrl: cdnurl,
                  mediaType: 'image',
                  latitude: calculat,
                  longitude: calcullong,
                }
              : {
                  mediaUrl: cdnurl,
                  mediaType: 'image',
                  latitude: 0,
                  longitude: 0,
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
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={image.mediaUrl}
              alt={`Upload ${index + 1}`}
              fill
              className="rounded-lg object-cover"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute right-1 top-1 rounded-full bg-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
            {image.latitude && (
              <p>
                {image.latitude} {image.longitude}
              </p>
            )}
          </div>
        ))}
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
