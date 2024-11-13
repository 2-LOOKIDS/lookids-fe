'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProfileAvatar from '../../ui/ProfileAvatar';
import React from 'react';

// import './style.css';

const petList = [
  { id: 0, name: '신지훈1', imgUrl: '/pome.jpg' },
  { id: 1, name: '신지훈2', imgUrl: '/jihunpistol.jpg' },
  { id: 2, name: '신지훈3', imgUrl: '/pome.jpg' },
  { id: 3, name: '신지훈4', imgUrl: '/jihunpistol.jpg' },
  { id: 4, name: '신지훈5', imgUrl: '/pome.jpg' },
  { id: 5, name: '박상언1', imgUrl: '/jihunpistol.jpg' },
  { id: 6, name: '박상언2', imgUrl: '/pome.jpg' },
  { id: 7, name: '박상언3', imgUrl: '/jihunpistol.jpg' },
  { id: 8, name: '박상언4', imgUrl: '/pome.jpg' },
];

function PetList() {
  return (
    <div className="min-h-[304px] w-full border-4 border-red-500 px-5 pt-9">
      <Swiper
        loop={true}
        modules={[Pagination, Grid]}
        pagination={true}
        slidesPerView={2}
        // grid={{ rows: 2 }}
        slidesPerGroup={2}
      >
        {petList.map((item) => {
          return (
            // <SwiperSlide key={item.id} className="!flex !gap-4">
            <SwiperSlide key={item.id}>
              <ProfileAvatar
                imgUrl={item.imgUrl}
                className="h-20 min-h-20 w-20 min-w-20"
                imgAlt={item.name}
              />
              <div className="max-w-[297px]">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-[#838383]">허스키 2살 남자아이</p>
                <p className="text-xs text-[#838383]">
                  웃겨보려고 한건 아니지만 웃긴다... 피식... 2년동안 얼굴 하나로
                  먹고 살고 있다.
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default PetList;
