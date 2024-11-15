import { Grid2x2, Heart } from 'lucide-react';

import React from 'react';

export default function FeedNavBar() {
  return (
    <nav className="flex h-8 w-[430px] flex-row items-start p-0 px-[18px]">
      <div className="flex h-8 w-[196px] flex-grow flex-row items-center justify-center gap-[33px] border-b-2 border-[#FD9340] p-0 pb-2">
        <div className="relative h-6 w-6">
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
            <Grid2x2 className="fill-lookids h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="flex h-8 w-[196px] flex-grow flex-row items-center justify-center gap-[33px] border-b-2 border-[#EDEDED] p-0 pb-2">
        <div className="h-6 w-6">
          <Heart className="h-6 w-6 text-[#EDEDED]" />
        </div>
      </div>
    </nav>
  );
}
