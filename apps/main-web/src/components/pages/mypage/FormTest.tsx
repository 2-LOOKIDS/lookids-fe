'use client';

import { DefaultValues, Path, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { z } from 'zod';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';

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
        const value = shape[field];
        if (value instanceof z.ZodString) {
          fieldInput = <Input {...register(field)} />;
        }
        if (value instanceof z.ZodNumber) {
          const { minValue, maxValue } = value;

          if (minValue !== null && maxValue !== null && value.isInt) {
            const range = maxValue - minValue;
            if (range < 100) {
              fieldInput = (
                <select {...register(field)}>
                  {Array.from({ length: range }).map((_, i) => {
                    return <option value={i + minValue}>{i + minValue}</option>;
                  })}
                </select>
              );
            } else {
              fieldInput = <Input type={'number'} {...register(field)} />;
            }
          } else {
            fieldInput = <Input type={'number'} {...register(field)} />;
          }
        }
        if (value instanceof z.ZodEnum) {
          value.options.map;
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
