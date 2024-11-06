"use client";

import "./styles.css";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/ui/input-otp";
import {
  checkCredentialsAvailabilityApi,
  sendVerificationCodeToEmailApi,
  verifyEmailCodeApi,
} from "../../../actions/auth/sign-up";
import { useEffect, useState } from "react";

import { Button } from "@repo/ui/components/ui/button";
import { Clock5 } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import ProgressBar from "./ProgressBar";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";

interface EmailVerificationProps {
  onNext: (email: string, emailVerificationCode: string) => void;
}

export default function EmailVerification({ onNext }: EmailVerificationProps) {
  const VERIFICATION_CODE_EXPIRATION_TIME = 180;
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(VERIFICATION_CODE_EXPIRATION_TIME);

  const form = useForm<EmailVerificationType>({
    resolver: zodResolver(EmailVerificationSchema),
    defaultValues: {
      email: "",
      emailVerificationCode: "",
    },
  });

  const startTimer = () => {
    setTimer(VERIFICATION_CODE_EXPIRATION_TIME); // 3분 설정
  };

  useEffect(() => {
    if (timer <= 0) return; // 타이머가 0이면 종료

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
  }, [timer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const checkEmailAvailability = async (email: string): Promise<boolean> => {
    const response = await checkCredentialsAvailabilityApi(email, "email");
    return response;
  };

  //인증 코드 발송
  const sendVerificationCodeToEmail = async (
    email: string,
  ): Promise<boolean> => {
    const response = await sendVerificationCodeToEmailApi(email);
    return response;
  };

  const validateEmailAndSendVerificationCodeToEmail = async () => {
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) return;
    const email = form.getValues("email");
    const isEmailUnique = await checkEmailAvailability(email);
    if (!isEmailUnique) {
      form.setError("email", {
        type: "manual",
        message: "이 이메일은 이미 사용 중입니다.",
      });
      setIsInputVisible(false);
    } else {
      setIsInputVisible(true);
      sendVerificationCodeToEmail(email);
      startTimer();
    }
  };

  const onSubmit: SubmitHandler<EmailVerificationType> = async (values) => {
    const response = await verifyEmailCodeApi(
      values.email,
      values.emailVerificationCode,
    );

    if (!response) {
      form.setError("emailVerificationCode", {
        type: "manual",
        message: "인증 코드가 일치하지 않습니다.",
      });
    } else {
      onNext(values.email, values.emailVerificationCode);
    }
  };

  return (
    <>
      <ProgressBar step={1} totalStep={3} />
      <FormProvider {...form}>
        <form>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mx-10">
                <FormControl>
                  <Input
                    className="signup-input"
                    placeholder="이메일"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-center">
                  <Button
                    type="button"
                    className="fixed bottom-[41px] left-[41px] right-[41px] flex h-[59px] flex-row items-center justify-center gap-2 rounded-xl bg-[#FD9340] px-2 py-[21px] text-center text-2xl font-semibold leading-6 text-white hover:bg-[#FD9340]/90"
                    onClick={validateEmailAndSendVerificationCodeToEmail}
                  >
                    <p className="text-[20px]">인증 코드 받기</p>
                  </Button>
                </div>
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
                    <FormControl className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        autoFocus
                        {...field}
                        onComplete={form.handleSubmit(onSubmit)}
                      >
                        <InputOTPGroup className="flex justify-center gap-1 mx-auto">
                          {[...Array(6)].map((_, index) => (
                            <InputOTPSlot
                              key={index}
                              className="h-[72px] w-[45px] rounded-xl border border-[#E5E5E5] bg-[#F4F4F4] text-2xl  font-mono text-[#FD9340] text-center"
                              index={index}
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <div className="text-center">
                      {form.formState.errors.emailVerificationCode && (
                        <FormMessage />
                      )}
                    </div>
                  </FormItem>
                )}
              ></FormField>
              <div className="flex items-center gap-1.5 justify-center text-[#FD9340]">
                <Clock5 size={20} />
                <p>{formatTime(timer)}</p>
              </div>
              <div className="mt-4 flex gap-2 justify-center">
                <p className="">인증 번호를 받지 않았다면?</p>
                <p
                  className="font-semibold"
                  onClick={validateEmailAndSendVerificationCodeToEmail}
                >
                  재전송
                </p>
              </div>
            </section>
          ) : (
            <p className="mt-[14px] text-center text-sm font-normal leading-6 text-[#838383]">
              인증받을 이메일을 입력하세요
            </p>
          )}
        </form>
      </FormProvider>
    </>
  );
}
