import Image from 'next/image';
import React from 'react';

interface FeedThumbnailProps {
  feedCode: string;
  imgUrl: string;
  imgAlt: string;
}

function FeedThumbnail({ imgUrl, imgAlt, feedCode }: FeedThumbnailProps) {
  return (
    <div className="relative aspect-square">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
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
