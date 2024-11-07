export interface FeedPostType {
  userUuid: string;
  petCode: string;
  content: string;
  tags: string[];
  media: MediaType[];
  gpsInformation: string;
}

export interface MediaType {
  mediaType: string;
  mediaUrl: string;
}

export interface gpsInfoType {
  latitude: number;
  longitude: number;
}
