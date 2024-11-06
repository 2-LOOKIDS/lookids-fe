"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import GoogleSign from "./signin/GoogleSign";
import KakaoSign from "./signin/KakaoSign";
import NaverSign from "./signin/NaverSign";
export default function LoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null); // 에러 메시지 상태

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log(formData.get("id"), formData.get("password"));

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
          <Label htmlFor="id">아이디</Label>
          <Input
            name="id"
            id="id"
            placeholder="아이디를 입력하세요"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            name="password"
            id="password"
            placeholder="********"
            type="password"
          />
        </div>
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

        <Button
          className="w-full bg-[#FD9340] hover:bg-[#FC703F] text-white"
          type="submit"
        >
          로그인
        </Button>
      </form>
      <div className="mt-4 flex items-center">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="mx-4 text-gray-500">혹은</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>

      <section className="flex justify-around items-center rounded-md mt-2 py-3 gap-x-2">
        <button
          onClick={() =>
            signIn("google", {
              redirect: false,
              callbackUrl: "/",
            })
          }
        >
          <GoogleSign />
        </button>
        <button
          onClick={() =>
            signIn("kakao", {
              redirect: false,
              callbackUrl: "/",
            })
          }
        >
          <KakaoSign />
        </button>
        <button
          onClick={() =>
            signIn("naver", {
              redirect: false,
              callbackUrl: "/",
            })
          }
        >
          <NaverSign />
        </button>
      </section>
    </div>
  );
}
