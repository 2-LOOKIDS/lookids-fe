export interface FeedPostType {
  petCode?: string;
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
export interface FeedThumbnailList {
  content: Thumbnail[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
