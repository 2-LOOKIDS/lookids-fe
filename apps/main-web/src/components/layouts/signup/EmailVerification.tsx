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
  checkCredentialsAvailability,
  sendVerificationCode,
} from "../../../actions/auth/sign-up";
import { useEffect, useState } from "react";

import { Button } from "@repo/ui/components/ui/button";
import { Clock5 } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import ProgressBar from "./ProgressBar";
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
    if (index === 5) {
      onSubmit(form.getValues());
    } else {
      document.getElementById(`input-${index + 1}`)?.focus();
    }
  };

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

  const isValidEmail = async (email: string): Promise<boolean> => {
    const response = await checkCredentialsAvailability(email, "email");
    return response;
  };

  const sendEmail = async (email: string): Promise<boolean> => {
    //인증 코드 발송
    const response = await sendVerificationCode(email);
    return response;
  };

  const validateEmailAndSendVerificationCode = async () => {
    const isEmailValid = await form.trigger("email");
    if (!isEmailValid) return;
    const email = form.getValues("email");
    const isEmailUnique = await isValidEmail(email);
    if (!isEmailUnique) {
      form.setError("email", {
        type: "manual",
        message: "이 이메일은 이미 사용 중입니다.",
      });
      setIsInputVisible(false);
    } else {
      setIsInputVisible(true);
      sendEmail(email);
      startTimer();
    }
  };

  const onSubmit: SubmitHandler<EmailVerificationType> = async (values) => {
    onNext(values.email, values.emailVerificationCode);
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
                    onClick={validateEmailAndSendVerificationCode}
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
                    <FormControl className="flex justify-center mt-[57px]">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <Input
                            key={index}
                            id={`input-${index}`} // 각 input에 고유 id 부여
                            type="text"
                            maxLength={1} // 각 input의 최대 길이 1
                            className="h-[72px] w-[50px] rounded-xl border border-[#E5E5E5] bg-[#F4F4F4] text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-[#FD9340] text-center"
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
              <div className="flex items-center gap-1.5 justify-center text-[#FD9340]">
                <Clock5 size={20} />
                <p>{formatTime(timer)}</p>
              </div>
              <div className="mt-4 flex gap-2 justify-center">
                <p className="">인증 번호를 받지 않았다면?</p>
                <p
                  className="font-semibold"
                  onClick={validateEmailAndSendVerificationCode}
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
