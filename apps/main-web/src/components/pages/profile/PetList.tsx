'use client';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { calculateAge, formatDateString } from '../../../utils/formatDate';

import { Button } from '@repo/ui/components/ui/button';
import { EditDialog } from '../mypage/EditDialog';
import { PetInfo } from '../../../types/user';
import ProfileAvatar from '../../ui/ProfileAvatar';
import { deletePet } from '../../../actions/user';
import { getMediaUrl } from '../../../utils/media';

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
          const image = getMediaUrl(pet.image);
          return (
            <SwiperSlide key={idx}>
              <ProfileAvatar
                imgUrl={image}
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
                <div>
                  <p className="text-grey text-sm">{pet.comment}</p>
                </div>
              </div>
              {isEdit && (
                <div className="absolute right-1 top-0 flex flex-col gap-2">
                  <EditDialog
                    type={'petProfile'}
                    fields={[
                      { label: '프로필 이미지', field: 'image' },
                      { label: '이름', field: 'name' },
                      { label: '종류', field: 'type' },
                      { label: '성별', field: 'gender' },
                      { label: '몸무게', field: 'weight' },
                      { label: '생일', field: 'birthDate' },
                      { label: '특징', field: 'comment' },
                    ]}
                    defaultValues={{
                      image: undefined,
                      name: '',
                      type: '',
                      gender: undefined,
                      weight: 0,
                      birthDate: '',
                      comment: '',
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
