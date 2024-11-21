import { z } from 'zod';

// 약관 동의 기본 스키마
const mustAgree = z.boolean().refine((val) => val === true, {
  message: '약관에 동의해야 합니다.',
});

// Step1 약관 동의 스키마
export const TermsConsentSchema = z.object({
  terms: z.object({
    term1: mustAgree,
    term2: mustAgree,
    term3: mustAgree,
  }),
});

// Step2 이메일 인증 스키마
export const EmailVerificationSchema = z.object({
  email: z
    .string()
    .email('유효한 이메일을 입력해야 합니다.')
    .refine((val) => val.trim().length > 0, {
      message: '이메일을 입력해야 합니다.',
    }),
  emailVerificationCode: z.string().refine((val) => val.trim().length > 0, {
    message: '인증 코드를 입력해야 합니다.',
  }),
});

// Step3 계정 정보 스키마
export const UserInfoSchema = z
  .object({
    loginId: z
      .string()
      .min(4, '아이디는 최소 4자 이상이어야 합니다.')
      .max(20, '아이디는 최대 20자 이하이어야 합니다.')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        '아이디는 알파벳, 숫자, 언더스코어만 포함해야 합니다.'
      ),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(20, '비밀번호는 최대 20자 이하이어야 합니다.')
      .regex(/^(?!.*(.)\1{2})/, '같은 문자가 3개 이상 연속될 수 없습니다.'),
    passwordConfirm: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임을 입력해주세요' })
      .max(10, { message: '닉네임은 최대 10자 입니다' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        message: '비밀번호가 일치하지 않습니다.',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type TermsConsentType = z.infer<typeof TermsConsentSchema>;
export type EmailVerificationType = z.infer<typeof EmailVerificationSchema>;
export type UserInfoType = z.infer<typeof UserInfoSchema>;

export interface Step1 {
  terms?: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
  email?: string;
  emailVerification?: string;
  loginId?: string;
  password?: string;
  passwordConfirm?: string;
  nickname?: string;
}

export interface Step2 {
  terms: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
  email?: string;
  emailVerificationCode?: string;
  loginId?: string;
  password?: string;
  passwordConfirm?: string;
  nickname?: string;
}

export interface Step3 {
  terms: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
  email: string;
  emailVerificationCode: string;
  loginId?: string;
  password?: string;
  passwordConfirm?: string;
  nickname?: string;
}

export interface VerificationResponse {
  verification: boolean;
}

export interface RegisterUserInfo {
  loginId: string;
  password: string;
  email: string;
  nickname: string;
}
