import EditDialog from './EditDialog';
import React from 'react';

export default function EditDescription() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">내 소개글</p>
      <p className="text-grey text-xs">
        소주 가온나 소주 가오라고 소주가 몇 병이고 소주 가온나 소주 가오라고
        소주가 몇 병이고 소주 가온나 소주 가오라고 소주가 몇 병이고
      </p>
      <div className="flex justify-start">
        <EditDialog />
      </div>
    </div>
  );
}
