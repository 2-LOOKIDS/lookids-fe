import EditDialog from './EditDialog';
import React from 'react';

interface EditNickNameProps {
  nickname: string;
  tag: string;
}
export default function EditNickName({ nickname, tag }: EditNickNameProps) {
  return (
    <div className="flex flex-col items-center gap-2 pt-2">
      <p className="font-semibold">
        {nickname}#{tag}
      </p>
      <EditDialog userNickname={nickname} />
    </div>
  );
}
