import Link from "next/link";
import LoginForm from "../../../components/layouts/LoginForm";
import CatJelly from "../../../components/icons/CatJelly";
import LookidsLogo from "../../../components/icons/LookidsLogo";

export default function Page() {
  // 갤럭시 인경우 mt-12정도 필요
  return (
    <div className="flex flex-col w-full items-center justify-center ">
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
