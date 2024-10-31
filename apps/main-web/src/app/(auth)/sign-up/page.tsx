// import SignUpForm from "../../../components/layouts/signup/SignUpForm";

import dynamic from "next/dynamic";

const SignUpForm = dynamic(
  () => import("../../../components/layouts/signup/SignUpForm"),
  {
    ssr: false,
  },
);

export default function page() {
  return (
    <main>
      <SignUpForm />
    </main>
  );
}
