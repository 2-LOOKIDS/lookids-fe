'use client';

import EditDialog from './EditDialog';
import { Path } from 'react-hook-form';
import { UserDescriptionSchema } from '../../../types/user';
import { z } from 'zod';

interface EditDescriptionProps {
  description: string;
  fields: {
    label: string;
    field: Path<z.TypeOf<typeof UserDescriptionSchema>>;
  }[];
}

export default function EditDescription({
  description,
  fields,
}: EditDescriptionProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">내 소개글</p>
      <p className="text-grey text-xs">{description}</p>
      <div className="flex justify-start">
        <EditDialog
          fields={fields}
          schema={UserDescriptionSchema}
          defaultValues={{
            description: description,
          }}
        />
      </div>
    </div>
  );
}
