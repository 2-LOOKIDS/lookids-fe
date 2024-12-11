// components/ImageList.tsx
import { X } from 'lucide-react';
import Image from 'next/image';

interface ImageListProps {
  images: Array<{
    mediaUrl: string;
    latitude: number;
    longitude: number;
  }>;
  removeImage: (index: number) => void;
}

export default function ImageList({ images, removeImage }: ImageListProps) {
  return (
    <>
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
    </>
  );
}
