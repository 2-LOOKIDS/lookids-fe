import Image from 'next/image';
import React from 'react';

interface FeedThumbnailProps {
  imgUrl: string;
  imgAlt: string;
}

function FeedThumbnail({ imgUrl, imgAlt }: FeedThumbnailProps) {
  return (
    // <div className="xs:w-[128px] xs:h-[140px] relative h-[108px] w-[108px]">
    <div className="relative h-[120px] w-full flex-1">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      ) : (
        // <div>{imgAlt}</div>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-[#838383]">{imgAlt}</p>
        </div>
      )}
    </div>
  );
}

export default FeedThumbnail;
