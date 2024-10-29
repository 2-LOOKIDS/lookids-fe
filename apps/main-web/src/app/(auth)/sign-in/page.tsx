import LoginForm from "../../../components/layouts/LoginForm";
import CatJelly from "../../../components/ui/CatJelly";
import LookidsLogo from "../../../components/ui/LookidsLogo";

export default function Page() {
  // 갤럭시 인경우 mt-12정도 필요
  return (
    <div className="flex flex-col w-full items-center justify-center ">
      <LookidsLogo />
      <LoginForm />
      <CatJelly />
    </div>
  );
}
