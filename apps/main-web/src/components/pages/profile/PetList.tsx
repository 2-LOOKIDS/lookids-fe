'use client';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import EditDialog from '../mypage/EditDialog';
import ProfileAvatar from '../../ui/ProfileAvatar';
import React from 'react';

const petList = [
  { id: 0, name: '신지훈1', imgUrl: '/pome.jpg' },
  { id: 1, name: '신지훈2', imgUrl: '/jihunpistol.jpg' },
  { id: 2, name: '신지훈3', imgUrl: '/pome.jpg' },
  { id: 3, name: '신지훈4', imgUrl: '/jihunpistol.jpg' },
  { id: 4, name: '신지훈5', imgUrl: '/pome.jpg' },
];

interface PetListProps {
  isEdit?: boolean;
}

function PetList({ isEdit }: PetListProps) {
  return (
    <>
      <Swiper
        modules={[Pagination, Grid]}
        pagination={true}
        grid={{ rows: 2 }}
        slidesPerView={1}
        spaceBetween={20}
        className="petList"
      >
        {petList.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <ProfileAvatar
                imgUrl={item.imgUrl}
                className="h-[77px] min-h-[77px] w-[77px] min-w-[77px]"
                imgAlt={item.name}
              />

              <div className="relative flex max-w-[297px] flex-col gap-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-grey text-sm">허스키 2살 남자아이</p>
                <p className="text-grey text-xs">
                  웃겨보려고 한건 아니지만 웃긴다... 피식... 2년동안 얼굴 하나로
                  먹고 살고 있다.
                </p>
                <p className="text-grey text-xs">허수키 견생 2회차..</p>
              </div>
              {isEdit && (
                <div className="absolute right-1 top-0">
                  <EditDialog />
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default PetList;
