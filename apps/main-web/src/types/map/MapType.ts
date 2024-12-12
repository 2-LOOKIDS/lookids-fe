export interface Pin {
  pinCode: string;
  latitude: number;
  longitude: number;
  category: string;
  locationScore: number;
  mediaUrl: string;
  feedCode: string;
}

export interface Bounds {
  ha: number;
  oa: number;
  pa: number;
  qa: number;
}
