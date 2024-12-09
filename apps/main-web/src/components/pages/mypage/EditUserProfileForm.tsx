'use client';

import { FormCustomField, FormInputField } from '../../forms/FormFields';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { UserProfileSchema, UserProfileType } from '../../../types/user';

import { Button } from '@repo/ui/components/ui/button';
import { Form } from '@repo/ui/components/ui/form';
import { formatDateFromNumber } from '../../../utils/formatDate';
import { updateUserProfile } from '../../../actions/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface EditUserProfileFormProps {
  setOpen: (open: boolean) => void;
  defaultValues: UserProfileType;
}

export default function EditUserProfileForm({
  setOpen,
  defaultValues,
}: EditUserProfileFormProps) {
  const form = useForm<UserProfileType>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      nickname: defaultValues.nickname,
      birthDate: defaultValues.birthDate,
      gender: defaultValues.gender,
    },
  });
  const onSubmit = async (values: UserProfileType) => {
    const birthDate = formatDateFromNumber(values.birthDate);
    const body = {
      nickname: values.nickname,
      gender: values.gender,
      birthDate: birthDate,
    };
    const response = await updateUserProfile(body);
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
          <FormInputField
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        <div className="w-4/5">
          <FormCustomField name="gender" label="성별">
            <Select
              onValueChange={(value) =>
                form.setValue('gender', value as '남자' | '여자', {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="!mt-0">
                <SelectValue placeholder={defaultValues.gender} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="남자">남자</SelectItem>
                <SelectItem value="여자">여자</SelectItem>
              </SelectContent>
            </Select>
          </FormCustomField>
        </div>

        <div className="w-4/5">
          <FormInputField
            name="birthDate"
            label="생년월일"
            type="number"
            placeholder="생년월일 8자리를 입력해주세요"
          />
        </div>

        <Button className="bg-lookids hover:bg-lookids/90" type="submit">
          수정
        </Button>
      </form>
    </Form>
  );
}
