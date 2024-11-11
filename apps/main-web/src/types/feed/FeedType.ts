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

export interface ImageGpsInfo {
  longitude: number;
  latitude: number;
}

export interface ImageData {
  mediaUrl: string;
  mediaType: string;
  gpsInfo?: ImageGpsInfo;
}
