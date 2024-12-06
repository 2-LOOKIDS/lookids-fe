import { z } from 'zod';

// 사람
export const UserProfileSchema = z.object({
  nickname: z.string().min(4, '닉네임을 입력해주세요'),
  gender: z.enum(['성별 선택', '남자', '여자'], {
    message: '성별을 선택해주세요',
  }),
});
export const UserCommentSchema = z.object({
  comment: z.string().min(1, '소개글을 작성해주세요'),
});

// 펫
export const PetProfileSchema = z.object({
  image: z.string().min(1, '애기 사진은 필수입니다'),
  name: z.string().min(2, '애기 이름을 입력해 주세요'),
  gender: z.enum(['수컷', '암컷'], { message: '성별을 선택해주세요' }),
  birthDate: z
    .string()
    .regex(/^\d{8}$/, {
      message: '생년월일을 입력해주세요',
    })
    .optional()
    .or(z.literal('')),
  type: z.string().min(2, { message: '반려 동물 종류를 입력해주세요' }),
  weight: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: '몸무게는 양수여야 합니다.',
    })
    .transform((val) => parseFloat(val)),
  // birthDate: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (val) => {
  //       if (val === undefined) return true; // optional이므로 값이 없을 경우 true 반환
  //       return /^\d{8}$/.test(val); // 8자리 형식 검사
  //     },
  //     {
  //       message: '생년월일은 8자리여야 합니다',
  //     }
  //   ),
  comment: z.string().optional(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type UserCommentType = z.infer<typeof UserCommentSchema>;
export type PetProfileType = z.infer<typeof PetProfileSchema>;

export interface UserInfo {
  uuid: string;
  nickname: string;
  tag: string;
  tierCode: string;
  birthDate: string;
  gender: string;
  comment: string;
  image: string;
}

//pet

export interface PetInfo extends PetProfileType {
  petCode: string;
}
