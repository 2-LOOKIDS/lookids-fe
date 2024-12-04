import Image from 'next/image';
import React from 'react';

interface FeedThumbnailProps {
  feedCode: string;
  imgUrl: string;
  imgAlt: string;
}

function FeedThumbnail({ imgUrl, imgAlt, feedCode }: FeedThumbnailProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
  if (!imgUrl.startsWith(BASE_URL!)) {
    imgUrl = BASE_URL + imgUrl;
  }
  return (
    <div className="relative aspect-square">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
          sizes="(max-width: 400px) 50vw"
          style={{ objectFit: 'cover' }}
          priority
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-[#838383]">{imgAlt}</p>
        </div>
      )}
    </div>
  );
}

export default FeedThumbnail;
