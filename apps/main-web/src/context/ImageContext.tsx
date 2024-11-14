// ImageContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';
import { MediaType } from '../types/feed/FeedType';

interface ImageContextProps {
  images: MediaType[];
  setImages: React.Dispatch<React.SetStateAction<MediaType[]>>;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<MediaType[]>([]);
  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImage() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
}
