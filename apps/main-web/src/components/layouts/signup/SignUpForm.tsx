"use client";

import { Step1, Step2, Step3 } from "../../../types/auth/signup";

import EmailVerification from "./EmailVerification";
import React from "react";
import SignUpHeader from "./SignUpHeader";
import TermsConsent from "./TermsConsent";
import UserInfo from "./UserInfo";
import { useFunnel } from "@use-funnel/browser";

export default function SignUpForm() {
  const funnel = useFunnel<{
    step1: Step1;
    step2: Step2;
    step3: Step3;
  }>({
    id: "signup-funnel",
    initial: {
      step: "step1",
      context: {},
    },
  });
  return (
    <section>
      <SignUpHeader />
      <funnel.Render
        step1={({ history }) => (
          <TermsConsent
            onNext={({ terms }) => {
              history.push("step2", {
                terms,
              });
            }}
          />
        )}
        step2={({ history, context }) => (
          <EmailVerification
            onNext={(email, emailVerificationCode) => {
              history.push("step3", {
                ...context,
                email,
                emailVerificationCode,
              });
            }}
          />
        )}
        step3={({ context }) => (
          <UserInfo
            terms={context.terms}
            email={context.email}
            emailVerificationCode={context.emailVerificationCode}
          />
        )}
      />
    </section>
  );
}
