"use client";

import {
  EmailVerificationSchema,
  EmailVerificationType,
} from "../../../types/auth/signup";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmailVerificationProps {
  onNext: (email: string, emailVerificationCode: string) => void;
}

export default function EmailVerification({ onNext }: EmailVerificationProps) {
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);

  const form = useForm<EmailVerificationType>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      email: "",
      emailVerificationCode: "",
    },
  });

  const isValidEmail = (email: string): boolean => {
    // 이메일 중복 확인
  };

  const sendEmail = (eamil: string): string => {
    //인증 코드 발송
  };

  const validateEmailAndSendVerificationCode = () => {
    // if (isValidEmail()) {
    //   setIsInputVisible(true);
    //   sendEmail();
    // }
    setIsInputVisible(true);
  };

  const onSubmit: SubmitHandler<EmailVerificationType> = (values) => {
    onNext(values.email, values.emailVerificationCode);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="이메일" type="email" {...field} />
              </FormControl>
              <Button
                type="button"
                onClick={validateEmailAndSendVerificationCode}
              >
                인증
              </Button>
              {form.formState.errors.email && <FormMessage />}
            </FormItem>
          )}
        ></FormField>
        {isInputVisible && (
          <FormField
            control={form.control}
            name="emailVerificationCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="인증 코드" type="text" {...field} />
                </FormControl>

                {form.formState.errors.emailVerificationCode && <FormMessage />}
              </FormItem>
            )}
          ></FormField>
        )}
        <Button>Next</Button>
      </form>
    </FormProvider>
  );
}
