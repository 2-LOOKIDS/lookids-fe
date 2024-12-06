'use client';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  const onDeletePet = async (petUuid: string) => {
    await deletePet(petUuid);
  };
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
          const image = getMediaUrl(pet.image);
          return (
            <SwiperSlide key={idx}>
              <ProfileAvatar
                imgUrl={getMediaUrl(pet.image)}
                className="h-[77px] min-h-[77px] w-[77px] min-w-[77px]"
                imgAlt={pet.name}
              />

              <div className="relative flex max-w-[297px] flex-col gap-1">
                <p className="font-semibold">
                  {pet.name} {pet.age}
                </p>
                <div className="flex gap-1">
                  <p className="text-grey text-sm">{pet.type} /</p>
                  <p className="text-grey text-sm">남자 /</p>
                  <p className="text-grey text-sm">{pet.weight}kg</p>
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
                      { label: '나이', field: 'age' },
                      { label: '특징', field: 'comment' },
                    ]}
                    defaultValues={{
                      image: image,
                      name: '',
                      type: '',
                      gender: undefined,
                      weight: '',
                      age: '',
                      comment: '',
                    }}
                  />

                  <AlertDialog>
                    <AlertDialogTrigger className="bg-lookids hover:bg-lookids/90 h-7 rounded-sm">
                      <p className="text-white text-sm">삭제</p>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <AlertDialogDescription>
                            삭제 하시겠습니까?
                          </AlertDialogDescription>
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          className="bg-lookids hover:bg-lookids/90 h-8"
                          onClick={() => onDeletePet(pet.petCode)}
                        >
                          삭제
                        </AlertDialogAction>
                        <AlertDialogCancel className="h-8">
                          취소
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
