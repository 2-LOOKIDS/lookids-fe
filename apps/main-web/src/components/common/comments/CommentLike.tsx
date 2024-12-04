'use client';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  getIsFavorite,
  putFavoriteComment,
} from '../../../actions/favorite/favorite';

export default function CommentLike({
  authorUuid,
  commentCode,
}: {
  authorUuid: string;
  commentCode: string;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // 좋아요 개수 (예시 값)

  // 좋아요 상태 초기화
  useEffect(() => {
    const fetchCommentLike = async () => {
      const res = await getIsFavorite(commentCode);
      console.log('현재 좋아요 상태', res);
      setIsLiked(res);
    };
    fetchCommentLike();
  }, [commentCode]);

  // 좋아요 클릭 핸들러
  const handleCommentLike = async () => {
    try {
      // 좋아요 상태를 토글
      setIsLiked((prev) => !prev);
      await putFavoriteComment(authorUuid, commentCode, '댓글');
      // 좋아요 개수 업데이트

      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Heart
        onClick={handleCommentLike}
        className={`cursor-pointer ${
          isLiked ? 'text-lookids fill-current' : 'text-lookids'
        }`}
        strokeWidth={isLiked ? 0 : 1}
      />
      <p className="text-gray-300">{likeCount}</p>
    </div>
  );
}
