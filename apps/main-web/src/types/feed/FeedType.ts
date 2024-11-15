export interface FeedPostType {
  petCode?: string;
  content: string;
  tags?: string[];
  mediaCode?: string[];
}

export interface MediaType {
  mediaType: string;
  mediaUrl: string;
  longitude: number;
  latitude: number;
}

export interface PinType {
  mediaCode: string;
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
