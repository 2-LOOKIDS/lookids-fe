import LoginForm from "../../../components/layouts/LoginForm";
import CatJelly from "../../../components/ui/CatJelly";
import LookidsLogo from "../../../components/ui/LookidsLogo";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center justify-center ">
      <LookidsLogo />
      <LoginForm />
      <CatJelly />
    </div>
  );
}
