import Link from 'next/link';
import LookidsLogo from '../../../components/icons/LookidsLogo';
import LoginForm from '../../../components/layouts/LoginForm';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }; // URLSearchParams 대신 객체 형태로 처리
}) {
  const autoLogin = searchParams.autoLogin === 'true'; // searchParams의 autoLogin 값 확인

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <LookidsLogo />
      {/* {autoLogin && <p className="text-gray-400">자동 로그인 중입니다.</p>} */}
      <LoginForm autoLogin={autoLogin} />
      <p className="text-gray-400">
        계정이 아직 없나요?
        <Link className="ml-4 text-red-500" href="/sign-up">
          Register
        </Link>
      </p>
    </div>
  );
}
