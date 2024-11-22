'use client';

import { DefaultValues, Path, useForm } from 'react-hook-form';
import { signinSchema, signupSchema } from '@/lib/db/schema';

import { GenericForm } from './signup-form';
import { Input } from '@/components/ui/input';
import { JSX } from 'react';
import { Label } from '@/components/ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormComponentProps<
  TShape extends z.ZodRawShape,
  TKey extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKey, TType>,
  TSchema extends TObject | z.ZodEffects<TObject>,
> {
  schema: TSchema;
  defaultValues: DefaultValues<z.infer<TSchema>>;
  fields: { label: string; field: Path<z.TypeOf<TSchema>> }[];
}

export const InternalGenericForm = <
  TShape extends z.ZodRawShape,
  TKey extends z.UnknownKeysParam,
  TType extends z.ZodTypeAny,
  TObject extends z.ZodObject<TShape, TKey, TType>,
  TSchema extends TObject | z.ZodEffects<TObject>,
>({
  schema,
  defaultValues,
  fields,
}: FormComponentProps<TShape, TKey, TType, TObject, TSchema>) => {
  const { register } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form>
      {fields.map(({ label, field }) => {
        const shape =
          schema instanceof z.ZodEffects
            ? schema.innerType().shape
            : schema.shape;
        let fieldInput: JSX.Element | null = null;
        if (shape[field] instanceof z.ZodString) {
          fieldInput = <Input {...register(field)} />;
        }
        if (shape[field] instanceof z.ZodNumber) {
          fieldInput = <Input type={'number'} {...register(field)} />;
        }
        return (
          <div key={field}>
            <Label>{label}</Label>
            {fieldInput}
          </div>
        );
      })}
    </form>
  );
};
