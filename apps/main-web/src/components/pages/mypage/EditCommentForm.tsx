'use client';

import { UserCommentSchema, UserCommentType } from '../../../types/user';

import { Button } from '@repo/ui/components/ui/button';
import { Form } from '@repo/ui/components/ui/form';
import { FormTextAreaField } from '../../forms/FormFields';
import React from 'react';
import { updateUserComment } from '../../../actions/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditCommentFormProps {
  setOpen: (open: boolean) => void;
  comment: string;
}
export default function EditCommentForm({
  setOpen,
  comment,
}: EditCommentFormProps) {
  const form = useForm<UserCommentType>({
    resolver: zodResolver(UserCommentSchema),
    defaultValues: {
      comment: comment,
    },
  });
  const onSubmit = async (values: UserCommentType) => {
    const response = await updateUserComment({ comment: values.comment });
    if (response.isSuccess) {
      setOpen(false);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-4/5">
          <FormTextAreaField
            name="comment"
            label="소개글"
            placeholder="소개를 간략하게 해주세요"
          />
        </div>

        <Button className="bg-lookids hover:bg-lookids/90" type="submit">
          수정
        </Button>
      </form>
    </Form>
  );
}
