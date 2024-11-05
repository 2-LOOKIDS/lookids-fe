import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { UserInfoSchema, UserInfoType } from "../../../types/auth/signup";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import ProgressBar from "./ProgressBar";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserInfoProps {
  terms: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
  email: string;
  emailVerificationCode: string;
}

const formInputs: Array<{
  name: keyof UserInfoType;
  label: string;
  type: string;
}> = [
  { name: "loginId", label: "아이디", type: "text" },
  { name: "password", label: "비밀번호", type: "password" },
  { name: "passwordConfirm", label: "비밀번호 확인", type: "password" },
  { name: "nickname", label: "닉네임", type: "text" },
];

export default function UserInfo({
  terms,
  email,
  emailVerificationCode,
}: UserInfoProps) {
  const form = useForm<UserInfoType>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      loginId: "",
      password: "",
      passwordConfirm: "",
      nickname: "",
    },
  });

  const onSubmit = (values: UserInfoType) => {
    console.log(email, emailVerificationCode, values);
  };

  return (
    <>
      <ProgressBar step={2} totalStep={3} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {formInputs.map((input, index) => (
            <FormField
              key={index}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem className="mx-10 mb-6">
                  <FormControl>
                    <Input
                      className="signup-input"
                      placeholder={input.label}
                      type={input.type}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors?.[input.name] && <FormMessage />}
                </FormItem>
              )}
            />
          ))}
          <Button className="fixed bottom-[41px] left-[41px] right-[41px] flex h-[59px] flex-row items-center justify-center gap-2 rounded-xl bg-[#FD9340] px-2 py-[21px] text-center text-2xl font-semibold leading-6 text-white hover:bg-[#FD9340]/90">
            회원가입
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
