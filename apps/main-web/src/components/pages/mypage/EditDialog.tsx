'use client';

import { DefaultValues, Path, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import {
  PetProfileSchema,
  UserCommentSchema,
  UserProfileSchema,
} from '../../../types/user';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { PencilLine } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface InternalDialogProps<
  TShape extends z.ZodRawShape,
  TKeys extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKeys, TType>,
  TSchema extends TObject | z.ZodEffects<TObject>,
> {
  schema: TSchema;
  fields: {
    label: string;
    field: Path<z.TypeOf<TSchema>>;
  }[];
  defaultValues: DefaultValues<z.infer<TSchema>>;
}

function InternalDialog<
  TShape extends z.ZodRawShape,
  TKeys extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKeys, TType>,
  TSchema extends TObject | z.ZodEffects<TObject>,
>({
  fields,
  schema,
  defaultValues,
}: InternalDialogProps<TShape, TKeys, TType, TObject, TSchema>) {
  type formType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (values: formType) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-lookids hover:bg-lookids/90 border-lookids flex h-7 items-center justify-center gap-1 rounded border bg-[rgba(255,233,221,0.2)] px-1 py-[6px] hover:text-white"
        >
          <PencilLine className="h-4 w-4" />
          <p className="text-sm">수정</p>
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[90%] rounded-sm"
      >
        <DialogTitle />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[90%] flex-col items-end gap-4 pt-4"
        >
          {fields &&
            fields.map(({ field, label }) => {
              const shape =
                schema instanceof z.ZodEffects
                  ? schema.innerType().shape
                  : schema.shape;
              let fieldInput: JSX.Element | null = null;
              const value = shape[field];
              if (value instanceof z.ZodEnum) {
                const enumValues = Object.keys(value.enum);
                fieldInput = (
                  <select
                    {...register(field)}
                    className="focus:outline-lookids w-full rounded-sm border border-gray-300
                    border-opacity-50 bg-white text-center
                    "
                  >
                    {enumValues.map((enumValue, index) => {
                      return (
                        <option
                          key={enumValue}
                          value={enumValue}
                          disabled={index === 0}
                        >
                          {enumValue}
                        </option>
                      );
                    })}
                  </select>
                );
              } else {
                fieldInput = (
                  <Input
                    id={label}
                    defaultValue={field}
                    {...register(field)}
                    className="text-center"
                  />
                );
              }

              return (
                field !== undefined && (
                  <div
                    key={field}
                    className=" flex w-full flex-col items-end gap-4"
                  >
                    <div className="flex w-full items-center gap-4">
                      <Label htmlFor={label} className="w-1/2 text-center">
                        {label}
                      </Label>
                      <div className="w-1/2">{fieldInput}</div>
                    </div>
                    {errors[field]?.message && (
                      <p className="text-sm text-red-500">
                        {errors[field]?.message as string}
                      </p>
                    )}
                  </div>
                )
              );
            })}
          <DialogFooter className="flex w-[90%] justify-end">
            <Button
              className="bg-lookids hover:bg-lookids/90 w-1/4"
              type="submit"
            >
              수정
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const schemaMap = {
  userProfile: UserProfileSchema,
  userComment: UserCommentSchema,
  petProfile: PetProfileSchema,
};
interface EditDialogProps<T extends keyof typeof schemaMap> {
  type: T;
  defaultValues: DefaultValues<z.infer<(typeof schemaMap)[T]>>;
  fields: { label: string; field: Path<z.TypeOf<(typeof schemaMap)[T]>> }[];
}

export function EditDialog<T extends keyof typeof schemaMap>({
  type,
  defaultValues,
  fields,
}: EditDialogProps<T>) {
  return (
    <InternalDialog
      schema={schemaMap[type]}
      defaultValues={defaultValues}
      fields={fields}
    />
  );
}
