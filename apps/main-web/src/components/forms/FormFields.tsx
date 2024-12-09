import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/ui/form';
import React, { ReactNode } from 'react';

import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useFormContext } from 'react-hook-form';

interface FormInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
}

interface FormCustomFieldProps {
  name: string;
  children: ReactNode;
  label?: string;
  description?: string;
}

interface FormTextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

export function FormInputField({
  name,
  label,
  placeholder,
  description,
  type,
}: FormInputFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            {label && <FormLabel className="w-2/5">{label}</FormLabel>}
            <FormControl>
              <Input
                type={type}
                className="!mt-0"
                placeholder={placeholder}
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}

export function FormTextAreaField({
  name,
  label,
  placeholder,
  description,
}: FormTextAreaFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            {label && <FormLabel className="w-2/5">{label}</FormLabel>}
            <FormControl>
              <Textarea placeholder={placeholder} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormCustomField({
  name,
  label,
  description,
  children,
}: FormCustomFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center">
            {label && <FormLabel className="w-2/5">{label}</FormLabel>}
            <FormControl>{children}</FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
