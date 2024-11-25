'use client';

import EditDialog from './EditDialog';
import { Path } from 'react-hook-form';
import { UserNicknameSchema } from '../../../types/user';
import { z } from 'zod';

interface EditNickNameProps {
  nickname: string;
  tag: string;
  fields: { label: string; field: Path<z.TypeOf<typeof UserNicknameSchema>> }[];
}
export default function EditNickName({
  nickname,
  tag,
  fields,
}: EditNickNameProps) {
  return (
    <div className="flex flex-col items-center gap-2 pt-2">
      <p className="font-semibold">
        {nickname}#{tag}
      </p>
      <EditDialog
        fields={fields}
        schema={UserNicknameSchema}
        defaultValues={{
          nickname: nickname,
        }}
      />
    </div>
  );
}
