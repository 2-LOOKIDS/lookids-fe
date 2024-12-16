'use client';

import { Heart } from 'lucide-react';

export default function LikeButton({
  isLiked,
  onToggle,
}: {
  isLiked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`absolute right-3 top-3 rounded-full p-2 ${
        isLiked ? 'bg-red-500' : 'opacity-50 bg-gray-800'
      }`}
      onClick={onToggle}
    >
      <Heart
        fill="white"
        className={`h-4 w-4 ${isLiked ? 'text-white' : 'text-gray-300'}`}
      />
    </div>
  );
}
