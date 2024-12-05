import { PetInfo } from '../../../types/user';
import PetList from '../profile/PetList';
import React from 'react';

interface EditPetsPrpos {
  petList: PetInfo[];
}
export default function EditPets({ petList }: EditPetsPrpos) {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-5 flex flex-col text-sm gap-2">
        <p className="font-semibold">펫 관리</p>
        {!petList && <p className="text-grey">펫을 추가해주세요!!</p>}
      </div>
      <PetList petList={petList} isEdit={true} />
    </div>
  );
}
