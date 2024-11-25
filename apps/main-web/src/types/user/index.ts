import { UserInfoSchema } from '../auth/signup';
import { z } from 'zod';

export const UserNicknameSchema = UserInfoSchema.pick({ nickname: true });
export const UserDescriptionSchema = z.object({
  description: z.string().min(1, '소개글을 작성해주세요!'),
});
export type UserNickNameType = z.infer<typeof UserNicknameSchema>;

export interface UserInfo {
  nickname: string;
  tag: string;
  tierCode: string;
  birthDate: string;
  gender: string;
  comment: string;
  image: string;
}
