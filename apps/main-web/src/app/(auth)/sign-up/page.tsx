import dynamic from "next/dynamic";

const SignUpForm = dynamic(
  () => import("../../../components/layouts/signup/SignUpForm"),
  {
    ssr: false,
  },
);

export default function page() {
  return (
    <main className="w-full">
      <SignUpForm />
    </main>
  );
}
