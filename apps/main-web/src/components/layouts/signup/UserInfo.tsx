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
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserInfoProps {
  terms: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
    term4: boolean;
    term5: boolean;
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {formInputs.map((input, index) => (
          <FormField
            key={index}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
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
        <Button>가입</Button>
      </form>
    </FormProvider>
  );
}
