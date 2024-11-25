'use client';

import EditDialog from './EditDialog';
import { UserDescriptionSchema } from '../../../types/user';

interface EditDescriptionProps {
  description: string;
}

export default function EditDescription({ description }: EditDescriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">내 소개글</p>
      <p className="text-grey text-xs">{description}</p>
      <div className="flex justify-start">
        <EditDialog
          fields={[{ label: '소개글', field: description }]}
          schema={UserDescriptionSchema}
          defaultValues={{
            description: description,
          }}
        />
      </div>
    </div>
  );
}
