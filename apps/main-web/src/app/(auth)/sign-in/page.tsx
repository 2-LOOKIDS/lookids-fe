import Link from 'next/link';
import CatJelly from '../../../components/icons/CatJelly';
import LookidsLogo from '../../../components/icons/LookidsLogo';
import LoginForm from '../../../components/layouts/LoginForm';

export default function Page() {
  // 갤럭시인 경우 mt-12정도 필요
  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <LookidsLogo />
      <LoginForm />
      <p className="text-gray-400">
        계정이 아직 없나요?
        <Link className="ml-4 text-red-500" href="/sign-up">
          Register
        </Link>
      </p>
      <CatJelly />
    </div>
  );
}
