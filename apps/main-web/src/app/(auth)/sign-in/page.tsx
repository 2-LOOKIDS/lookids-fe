import Link from 'next/link';
import LookidsLogo from '../../../components/icons/LookidsLogo';
import LoginForm from '../../../components/layouts/LoginForm';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const autoLogin = searchParams.autoLogin === 'true';

  return (
    <div className="bg-[#F9F9F9] flex w-full flex-col items-center justify-center">
      <LookidsLogo />
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
