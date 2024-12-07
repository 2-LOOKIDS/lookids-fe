'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/ui/dialog';
import React, { useState } from 'react';

interface InputFormDialogProps<T> {
  TriggerComponent: JSX.Element;
  FormComponent: React.ComponentType<
    T & {
      setOpen: (open: boolean) => void;
    }
  >;
  formProps: T;
}

export default function InputFormDialog<T>({
  TriggerComponent,
  FormComponent,
  formProps,
}: InputFormDialogProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-[90%] rounded-sm"
      >
        <DialogTitle className="hidden" />
        <FormComponent setOpen={setOpen} {...formProps} />
      </DialogContent>
    </Dialog>
  );
}
