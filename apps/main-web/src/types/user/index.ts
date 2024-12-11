import { z } from 'zod';

// 사람
export const UserProfileSchema = z.object({
  nickname: z.string().min(4, '닉네임을 입력해주세요'),
  birthDate: z.coerce
    .number()
    .nullable()
    .refine(
      (val) => {
        if (val === null) return true; // null이면 패스
        const dateStr = val.toString();
        if (dateStr.length !== 8) return false; // 8자리 숫자가 아니면 패스

        const year = parseInt(dateStr.slice(0, 4), 10);
        const month = parseInt(dateStr.slice(4, 6), 10) - 1; // 월은 0부터 시작
        const day = parseInt(dateStr.slice(6, 8), 10);

        const date = new Date(year, month, day);

        // 유효한 날짜인지 확인
        return (
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
        );
      },
      {
        message: '정확한 생년월일 8자리를 입력해주세요',
      }
    ),
  gender: z.enum(['남자', '여자'], {
    message: '성별을 선택해주세요',
  }),
});
export const UserCommentSchema = z.object({
  comment: z
    .string()
    .min(3, '소개글을 작성해주세요')
    .nullable()
    .refine((val) => val !== null, {
      message: '소개글을 입력해주세요.',
    }),
});

// 펫
export const PetProfileSchema = z.object({
  image: z.string().min(1, '애기 사진은 필수입니다'),
  name: z.string().min(1, '애기 이름을 입력해 주세요'),
  gender: z.enum(['수컷', '암컷'], { message: '성별을 선택해주세요' }),
  type: z.string().min(1, { message: '반려 동물 종류를 입력해주세요' }),
  weight: z.coerce.number().positive({ message: '몸무게는 양수여야 합니다.' }),
  age: z.coerce.number().positive({ message: '나이는 양수여야 합니다.' }),
  comment: z.string().optional(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type UserCommentType = z.infer<typeof UserCommentSchema>;
export type PetProfileType = z.infer<typeof PetProfileSchema>;

enum Gender {
  Male = '남자',
  Female = '여자',
}

export interface UserInfo {
  uuid: string;
  nickname: string;
  tag: string;
  tierCode: string;
  birthDate: string;
  gender: Gender;
  comment: string;
  image: string;
}

//pet

export interface PetInfo extends PetProfileType {
  petCode: string;
}

export interface PetDetail {
  petCode: string;
  name: string;
  comment: string;
  gender: string;
  age: number;
  type: string;
  weight: number;
  image: string;
}
