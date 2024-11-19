'use client';

import { Step1, Step2, Step3 } from '../../types/auth/signup';

import { useFunnel } from '@use-funnel/browser';
import CommonHeader from '../ui/SignUpHeader';
import EmailVerificationForm from './EmailVerificationForm';
import TermsConsentForm from './TermsConsentForm';
import UserInfoForm from './UserInfoForm';

export default function SignUpForm() {
  const funnel = useFunnel<{
    step1: Step1;
    step2: Step2;
    step3: Step3;
  }>({
    id: 'signup-funnel',
    initial: {
      step: 'step1',
      context: {},
    },
  });
  return (
    <>
      <CommonHeader title="회원가입" />
      <funnel.Render
        step1={({ history }) => (
          <TermsConsentForm
            onNext={({ terms }) => {
              history.push('step2', {
                terms,
              });
            }}
          />
        )}
        step2={({ history, context }) => (
          <EmailVerificationForm
            onNext={(email, emailVerificationCode) => {
              history.push('step3', {
                ...context,
                email,
                emailVerificationCode,
              });
            }}
          />
        )}
        step3={({ context }) => (
          <UserInfoForm
            terms={context.terms}
            email={context.email}
            emailVerificationCode={context.emailVerificationCode}
          />
        )}
      />
    </>
  );
}
