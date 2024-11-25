'use client';

import InternalDialog, { EditDialogProps } from './EditDialog';
import { DefaultValues, Path } from 'react-hook-form';
import { UserNickNameType, UserNicknameSchema } from '../../../types/user';
import { z } from 'zod';

// type a = Pick<EditDialogProps<typeof UserNicknameSchema>, 'fields'>
interface EditNickNameProps {
  nickname: string;
  tag: string;
  fields: { label: string; field: Path<z.TypeOf<typeof UserNicknameSchema>> }[];
  defaultValues: DefaultValues<z.infer<typeof UserNicknameSchema>>;
}

// TODO: 이름이 이상하고 왜 컴포넌트로 만들었냐
// UserEditDialog
export default function EditNickName({
  nickname,
  tag,
  fields,
}: EditNickNameProps) {
  return (
    <InternalDialog
      fields={fields}
      schema={UserNicknameSchema}
      defaultValues={{
        nickname: nickname,
      }}
    />
  );
}
