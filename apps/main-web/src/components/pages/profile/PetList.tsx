'use client';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { calculateAge, formatDateString } from '../../../utils/formatDate';

import { EditDialog } from '../mypage/EditDialog';
import { PetInfo } from '../../../types/user';
import ProfileAvatar from '../../ui/ProfileAvatar';

interface PetListProps {
  petList: PetInfo[];
  isEdit?: boolean;
}

function PetList({ petList, isEdit }: PetListProps) {
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
        {petList.map((pet, idx) => {
          const age = calculateAge(pet.birthDate);
          const dateString = formatDateString(pet.birthDate);
          return (
            <SwiperSlide key={idx}>
              <ProfileAvatar
                imgUrl={pet.image}
                className="h-[77px] min-h-[77px] w-[77px] min-w-[77px]"
                imgAlt={pet.name}
              />

              <div className="relative flex max-w-[297px] flex-col gap-1">
                <p className="font-semibold">
                  {pet.name} {age}
                </p>
                <div className="flex gap-1">
                  <p className="text-grey text-sm">{pet.type} /</p>
                  <p className="text-grey text-sm">남자 /</p>
                  <p className="text-grey text-sm">{pet.weight}kg /</p>
                  <p className="text-grey text-sm">{dateString}</p>
                </div>
              </div>
              {isEdit && (
                <div className="absolute right-1 top-0">
                  <EditDialog
                    type={'petProfile'}
                    fields={[
                      { label: '이름', field: 'nickname' },
                      { label: '종류', field: 'type' },
                      { label: '성별', field: 'gender' },
                      { label: '몸무게', field: 'weight' },
                      { label: '생일', field: 'birthdate' },
                    ]}
                    defaultValues={{
                      nickname: '',
                      type: '동물 종류 선택',
                      gender: '성별 선택',
                      weight: '',
                      birthdate: '',
                    }}
                  />
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
