'use client';
import { Heart } from 'lucide-react';

export default function CommentLike({ commentCode }: { commentCode: string }) {
  // commentCode를 받아와서 해당 comment에 대한 좋아요 수를 보여주고,
  //  해당 comment에 좋아요를 눌렀는지 여부를 보여줌
  const handleCommentLike = async () => {};
  return (
    <div className="flex flex-col items-center  ">
      <Heart
        onClick={handleCommentLike}
        className="text-lookids"
        strokeWidth={1}
      />
      <p className="text-gray-300">12</p>
    </div>
  );
}
