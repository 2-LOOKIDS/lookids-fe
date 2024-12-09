import { PaginationResponse } from '../responseType';

export interface FeedPostType {
  petCode?: string[];
  content: string;
  tagList?: string[];
  mediaUrlList?: string[];
}

export interface MediaType {
  mediaType: string;
  mediaUrl: string;
  longitude: number;
  latitude: number;
}

export interface PinType {
  mediaUrl: string;
  longitude: number;
  latitude: number;
  category: string;
  locationScore?: number;
}

export interface ImageGpsInfo {
  longitude: number;
  latitude: number;
}

export interface FeedDetail {
  uuid: string;
  tag: string;
  nickname: string;
  image: string;
  petCode?: string;
  content: string;
  tagList?: string[];
  mediaUrlList: string[];
  createdAt: string;
  feedCode: string;
}
//피드 카드 내부의 섹션들
export interface ContentSection {
  petName: string;
  petImageUrl: string;
  userNickname: string;
  createdAt: string;
}

export interface ReactionSection {
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface Thumbnail {
  feedCode: string;
  mediaUrl: string;
}
export type FeedThumbnailList = PaginationResponse<Thumbnail>;
export interface searchFeedResult {
  feedCode: string;
  tagList?: string[];
  mediaUrlList: string[];
}
