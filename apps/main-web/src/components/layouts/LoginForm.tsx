"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
export default function LoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null); // 에러 메시지 상태

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      loginId: formData.get("id") as string,
      password: formData.get("password") as string,
      callbackUrl: "/",
      redirect: true, // 에러 핸들링을 위해 redirect를 false로 설정
    });

    if (result?.error) {
      setLoginError("아이디 혹은 비밀번호가 일치하지 않습니다."); // 에러 메시지 설정
    } else {
      setLoginError(null); // 에러 없으면 초기화
      window.location.href = "/"; // 성공 시 리다이렉트
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg  w-96 mx-auto mt-2">
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="userEmail">이메일</Label>
          <Input
            id="userEmail"
            placeholder="이메일을 입력하세요"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" placeholder="********" type="password" />
        </div>
        <Button
          className="w-full bg-[#FD9340] hover:bg-[#FC703F] text-white"
          type="submit"
        >
          로그인
        </Button>
      </form>

      <div className="flex justify-around items-center rounded-md mt-2 py-3 gap-x-4">
        <button
          onClick={() =>
            signIn("google", {
              redirect: true,
              callbackUrl: "/",
            })
          }
        >
          <Image src="/signin/google.png" width={50} height={50} alt={""} />
        </button>
        <button
          onClick={() =>
            signIn("kakao", {
              redirect: true,
              callbackUrl: "/",
            })
          }
        >
          <Image src="/signin/kakao.png" width={50} height={50} alt={""} />
        </button>
        <button
          onClick={() =>
            signIn("naver", {
              redirect: true,
              callbackUrl: "/",
            })
          }
        >
          <Image src="/signin/naver.png" width={50} height={50} alt={""} />
        </button>
      </div>
    </div>
  );
}
