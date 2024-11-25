import { DefaultValues, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { PencilLine } from 'lucide-react';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface GenericFormProps<
  TShape extends z.ZodRawShape,
  TKey extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKey, TType>,
  TSchema extends TObject | z.ZodEffects<TObject>,
> {
  fields: { label: string; field: string }[];
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
}

export default function GenericForm<
  TShape extends z.ZodRawShape,
  TKey extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKey, TType>,
  TSchema extends TObject | z.ZodEffects<TObject>,
>({
  fields,
  schema,
  defaultValues,
}: GenericFormProps<TShape, TKey, TType, TObject, TSchema>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
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
      <DialogContent className="w-[90%] rounded-sm">
        <ul className="flex w-[90%] flex-col items-end gap-4 pt-4">
          {fields.map(
            (field, idx) =>
              field.field !== undefined && (
                <li key={idx} className="flex items-center gap-4">
                  <Label htmlFor={field.label} className="w-[50px] text-right">
                    {field.label}
                  </Label>
                  <Input
                    id={field.label}
                    defaultValue={field.field}
                    className="w-[90%]"
                  />
                </li>
              )
          )}
        </ul>
        <DialogFooter className="flex w-[90%] justify-end">
          <Button
            className="bg-lookids hover:bg-lookids/90 w-1/5"
            type="submit"
          >
            수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
