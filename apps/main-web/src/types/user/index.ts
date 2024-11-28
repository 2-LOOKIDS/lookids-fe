import { z } from 'zod';

// 사람
export const UserProfileSchema = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요!'),
  gender: z.enum(['성별 선택', '남자', '여자'], {
    message: '성별을 선택해주세요!',
  }),
});
export const UserCommentSchema = z.object({
  comment: z.string().min(1, '소개글을 작성해주세요!'),
});

// 펫
export const PetProfileSchema = z.object({
  nickname: z.string().min(1, '애기 이름을 입력해 주세요!'),
  type: z.enum(['동물 종류 선택', '개', '고양이']),
  gender: z.enum(['성별 선택', '수컷', '암컷']),
  birthdate: z
    .string()
    .min(8, '생년월일 8자리를 입력해주세요!')
    .max(8, '생년월일 8자리를 입력해주세요!'),
  weight: z.string().min(1, '애기 몸무게를 입력해주세요!'),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type UserCommentType = z.infer<typeof UserCommentSchema>;
export type PetProfileType = z.infer<typeof PetProfileSchema>;

export interface UserInfo {
  nickname: string;
  tag: string;
  tierCode: string;
  birthDate: string;
  gender: string;
  comment: string;
  image: string;
}
