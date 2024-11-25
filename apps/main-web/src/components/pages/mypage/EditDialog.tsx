'use client';

import { DefaultValues, Path, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import { FormControl, FormField } from '@repo/ui/components/ui/form';
import { UserDescriptionSchema, UserNicknameSchema } from '../../../types/user';
import { ZodSchema, ZodType, z } from 'zod';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { PencilLine } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

// TObject extends z.ZodObject<z.ZodRawShape, z.UnknownKeysParam, z.ZodTypeAny>,

interface EditDialogProps<
  TShape extends z.ZodRawShape,
  TKeys extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKeys, TType>,
  TSchema extends TObject | z.ZodEffects<TType>,
> {
  schema: TSchema;
  fields: {
    label: string;
    field: Path<z.TypeOf<TSchema>>;
  }[];
  defaultValues: DefaultValues<z.infer<TSchema>>;
}

export default function EditDialog<
  TShape extends z.ZodRawShape,
  TKeys extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKeys, TType>,
  TSchema extends TObject | z.ZodEffects<TType>,
>({
  fields,
  schema,
  defaultValues,
}: EditDialogProps<TShape, TKeys, TType, TObject, TSchema>) {
  type formType = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    getValues,
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
        className="w-[90%] rounded-sm"
      >
        <DialogTitle />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[90%] flex-col items-end gap-4 pt-4"
        >
          {fields &&
            fields.map(
              (field, idx) =>
                field.field !== undefined && (
                  <li key={idx} className="flex items-center gap-4">
                    <Label
                      htmlFor={field.label}
                      className="w-[50px] text-right"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.label}
                      defaultValue={field.field}
                      className="w-[90%]"
                      {...register(field.field)}
                    />

                    {errors[field.field]?.message && (
                      <span className="text-sm text-red-500">
                        {errors[field.field]?.message as string}
                      </span>
                    )}
                  </li>
                )
            )}
          <DialogFooter className="flex w-[90%] justify-end">
            <Button
              className="bg-lookids hover:bg-lookids/90 w-1/5"
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
