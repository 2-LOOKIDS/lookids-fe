import { ChevronLeft } from "lucide-react";
import React from "react";

export default function SignUpHeader() {
  return (
    <section className="mt-[52px] h-12 flex items-center relative">
      <ChevronLeft
        className="absolute left-3"
        onClick={() => window.history.back()}
      />
      <p className="font-semibold text-center flex-1">회원가입</p>
    </section>
  );
}
