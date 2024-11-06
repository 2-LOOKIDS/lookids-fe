"use client";

import {
  EmailVerificationSchema,
  EmailVerificationType,
} from "../../../types/auth/signup";
import { FormControl, FormField, FormItem } from "@repo/ui/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/ui/input-otp";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  const form = useForm<EmailVerificationType>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      email: "",
      emailVerificationCode: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(values);
    console.log("test");
  };

  return (
    <main>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="emailVerificationCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type="submit">버튼</Button>
        </form>
      </FormProvider>
    </main>
  );
};

export default page;
