import PetList from '../profile/PetList';
import React from 'react';

export default function EditPets() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">펫 관리</p>
      <PetList isEdit={true} />
    </div>
  );
}
