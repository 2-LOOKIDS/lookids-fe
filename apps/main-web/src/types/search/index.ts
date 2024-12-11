import { PaginationResponse } from '../responseType';

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
