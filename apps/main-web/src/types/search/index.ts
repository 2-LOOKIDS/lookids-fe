import { PaginationResponse } from '../responseType';
import { z } from 'zod';

export const SearchWordSchema = z.object({
  searchWord: z
    .string()
    .regex(/^[가-힣a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ]*$/, '특수 문자는 허용되지 않습니다.'),
});
export type SearchWordType = z.infer<typeof SearchWordSchema>;

export interface SearchContentUser {
  uuid: string;
  nickname: string;
  tag: string;
  profileImage: string;
}

export interface SearchContentFeed {
  feedCode: string;
  tagList: string[];
  mediaUrlList: string[];
}

export interface SearchContentPet {
  petName: string;
  petType: string;
  petImage: string;
  petCode: string;
  userNickname: string[];
  userTag: string[];
}

export type SearchResultListUser = PaginationResponse<SearchContentUser>;
export type SearchResultListFeed = PaginationResponse<SearchContentFeed>;
export type SearchResultListPet = PaginationResponse<SearchContentPet>;
