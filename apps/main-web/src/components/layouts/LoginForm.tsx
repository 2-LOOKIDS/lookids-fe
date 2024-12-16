'use client';

import { useEffect, useState } from 'react';

import { Button } from '@repo/ui/components/ui/button';
import GoogleSign from '../icons/signIn/GoogleSign';
import { Input } from '@repo/ui/components/ui/input';
import KakaoSign from '../icons/signIn/KakaoSign';
import { Label } from '@repo/ui/components/ui/label';
import NaverSign from '../icons/signIn/NaverSign';
import { signIn } from 'next-auth/react';

export default function LoginForm({
  autoLogin = false,
}: {
  autoLogin?: boolean;
}) {
  const [loginError, setLoginError] = useState<string | null>(null); // 에러 메시지 상태

  // autoLogin 값이 true일 경우 자동으로 로그인
  useEffect(() => {
    if (autoLogin) {
      (async () => {
        const result = await signIn('credentials', {
          loginId: 'storyoser',
          password: '12345678',
          callbackUrl: '/',
          redirect: false, // 에러 핸들링을 위해 redirect를 false로 설정
        });

        if (result?.error) {
          setLoginError('자동 로그인에 실패했습니다.');
        } else {
          setLoginError(null);
          window.location.href = '/'; // 성공 시 리다이렉트
        }
      })();
    }
  }, [autoLogin]);

  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn('credentials', {
      loginId: formData.get('id') as string,
      password: formData.get('password') as string,
      callbackUrl: '/',
      redirect: false, // 에러 핸들링을 위해 redirect를 false로 설정
    });

    if (result?.error) {
      setLoginError('아이디 혹은 비밀번호가 일치하지 않습니다.');
    } else {
      setLoginError(null);
      window.location.href = '/'; // 성공 시 리다이렉트
    }
  };

  return (
    <div className="mx-auto mt-2 w-96 px-2 rounded-xl bg-[#F9F9F9] p-8 ">
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="id">아이디</Label>
          <Input
            name="id"
            id="id"
            placeholder="아이디를 입력하세요"
            type="text"
            className="text-[16px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            name="password"
            id="password"
            placeholder="********"
            type="password"
            className="text-[16px]"
          />
        </div>
        {loginError && <p className="text-sm text-red-500">{loginError}</p>}

        <Button
          className="w-full bg-[#FD9340] text-white hover:bg-[#FC703F]"
          type="submit"
        >
          로그인
        </Button>
      </form>
      <div className="mt-4 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">혹은</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <section className="mt-2 flex items-center justify-around gap-x-2 rounded-md py-3">
        <button
          onClick={() =>
            signIn('google', {
              redirect: false,
              callbackUrl: '/',
            })
          }
        >
          <GoogleSign />
        </button>
        <button
          onClick={() =>
            signIn('kakao', {
              redirect: false,
              callbackUrl: '/',
            })
          }
        >
          <KakaoSign />
        </button>
        <button
          onClick={() =>
            signIn('naver', {
              redirect: false,
              callbackUrl: '/',
            })
          }
        >
          <NaverSign />
        </button>
      </section>
    </div>
  );
}
