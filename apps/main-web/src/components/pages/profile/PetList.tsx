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

import EditPetForm from '../mypage/EditPetForm';
import InputFormDialog from '../../forms/InputFormDialog';
import { PencilLine } from 'lucide-react';
import { PetInfo } from '../../../types/user';
import ProfileAvatar from '../../ui/ProfileAvatar';
import React from 'react';
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
          const defaultValues = pet;
          return (
            <SwiperSlide key={idx}>
              <ProfileAvatar
                imgUrl={image}
                className="h-[77px] min-h-[77px] w-[77px] min-w-[77px]"
                imgAlt={pet.name}
              />

              <div className="relative flex max-w-[297px] flex-col gap-1 pl-4">
                <p className="font-semibold">
                  {pet.name} {pet.age}
                </p>
                <div className="flex gap-1">
                  <p className="text-grey text-sm">{pet.type} /</p>
                  <p className="text-grey text-sm">{pet.gender} /</p>
                  <p className="text-grey text-sm">{pet.weight}kg</p>
                </div>
                <div>
                  <p className="text-grey text-sm">{pet.comment}</p>
                </div>
              </div>

              {isEdit && (
                <div className="absolute right-1 top-0 flex flex-col gap-2">
                  <InputFormDialog
                    TriggerComponent={<EditPetButton />}
                    FormComponent={EditPetForm}
                    formProps={{
                      petCode: pet.petCode,
                      defaultValues: defaultValues,
                    }}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger className="bg-lookids hover:bg-lookids/90 h-7 rounded-sm">
                      <p className="text-white text-sm">삭제</p>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-3/4">
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
                        <AlertDialogCancel className="h-8 m-0">
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

export const EditPetButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      className={`text-lookids hover:bg-lookids/90 border-lookids flex h-7 items-center justify-center gap-1 rounded border bg-[rgba(255,233,221,0.2)] px-1 py-[6px] hover:text-white ${props.className}`}
      {...props}
    >
      <PencilLine className="h-4 w-4" />
      <p className="text-sm">수정</p>
    </div>
  );
});

export default PetList;
