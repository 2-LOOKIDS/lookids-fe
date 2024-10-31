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
import { useRef, useState } from "react";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import ProgressBar from "./ProgressBar";
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

  const handleChange = (index: number, value: string) => {
    // 최대 6자리로 제한하고 값 업데이트
    const codeArray = [
      ...(form.control._formValues.emailVerificationCode || "").split(""),
    ];
    codeArray[index] = value;

    // 값이 6자리 이상이 되면 자르기
    const newValue = codeArray.join("").slice(0, 6);
    form.setValue("emailVerificationCode", newValue);

    // 다음 인덱스로 포커스 이동 (마지막 인덱스가 아닐 경우)
    if (value && index < 5) {
      document.getElementById(`input-${index + 1}`)?.focus(); // 다음 입력 필드로 포커스 이동
    }
  };

  return (
    <>
      <ProgressBar step={1} totalStep={3} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mx-10 ">
                <FormControl>
                  <Input
                    className="h-[52px] text-[20px]  placeholder:text-[#BDBDBD] focus-visible:ring-0 focus-visible:ring-offset-0 border-0 border-b rounded-none "
                    placeholder="이메일"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  className="fixed bottom-[41px] left-[41px] right-[41px] flex h-[59px]  flex-row items-center justify-center gap-2 rounded-xl bg-[#FD9340] px-2 py-[21px] text-center text-2xl font-semibold leading-6 text-white hover:bg-[#FD9340]/90"
                  onClick={validateEmailAndSendVerificationCode}
                >
                  <p className="text-[20px]">인증 코드 받기</p>
                </Button>
                {form.formState.errors.email && <FormMessage />}
              </FormItem>
            )}
          ></FormField>
          {isInputVisible ? (
            <section>
              <div className="flex flex-col items-center gap-3 mt-7">
                <p className="font-bold text-[25px]">인증 번호 확인</p>
                <p className="text-[14px]">아래 인증 번호를 입력해주세요.</p>
              </div>
              <FormField
                control={form.control}
                name="emailVerificationCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="flex justify-center mt-[57px]">
                      <div className="flex gap-2 mb-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <Input
                            key={index}
                            id={`input-${index}`} // 각 input에 고유 id 부여
                            type="text"
                            maxLength={1} // 각 input의 최대 길이 1
                            className="h-[72px] w-[50px] rounded-xl border border-[#E5E5E5] bg-[#F4F4F4] text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-orange-500 text-center"
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                          />
                        ))}
                      </div>
                    </FormControl>

                    {form.formState.errors.emailVerificationCode && (
                      <FormMessage />
                    )}
                  </FormItem>
                )}
              ></FormField>
            </section>
          ) : (
            <p className="mt-[14px] text-center text-sm font-normal leading-6 text-[#838383]">
              인증받을 이메일을 입력하세요
            </p>
          )}
          <Button>Next</Button>
        </form>
      </FormProvider>
    </>
  );
}
