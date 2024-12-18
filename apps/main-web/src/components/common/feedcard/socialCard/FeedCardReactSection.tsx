'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFavoriteCount } from '../../../../actions/batch/batch';
import {
  getIsFavorite,
  putFavoriteComment,
} from '../../../../actions/favorite/favorite';
import { getCommentCount } from '../../../../actions/feed/comment';

interface SocialCardReactionProps {
  feedCode: string;
  authorUuid: string;
  onShareClick: () => void;
}

export default function SocialCardReaction({
  feedCode,
  authorUuid,
  onShareClick,
}: SocialCardReactionProps) {
  const router = useRouter();

  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [likeData, favoriteState, commentData] = await Promise.all([
          getFavoriteCount(feedCode, '피드'),
          getIsFavorite(feedCode),
          getCommentCount(feedCode),
        ]);

        setLikeCount(likeData?.count ?? 0);
        setIsLiked(favoriteState ?? false);
        setCommentCount(commentData?.commentCount ?? 0);
      } catch (error) {
        console.error('리액션 데이터 로드 중 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [feedCode]);

  // 좋아요 토글
  const toggleLike = async () => {
    try {
      // Optimistic UI
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      // 서버 요청
      await putFavoriteComment(authorUuid, feedCode, '피드');
    } catch (error) {
      console.error('좋아요 토글 실패:', error);

      // 롤백
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-x-5 w-full border-t border-gray-100 py-4 mt-2 text-xs text-gray-400">
        <div className="animate-pulse w-10 h-4 bg-gray-200 rounded"></div>
        <div className="animate-pulse w-10 h-4 bg-gray-200 rounded"></div>
        <div className="animate-pulse w-10 h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-x-5 w-full border-t border-gray-100 py-4 mt-2 text-xs text-gray-400">
      <ul className="flex items-center gap-x-2">
        <li>
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
            <motion.div
              animate={{
                scale: isLiked ? [1, 1.2, 1] : 1,
                color: isLiked ? '#fd9340' : '#94A3B8',
              }}
              transition={{ duration: 0.3 }}
            >
              <ThumbsUp
                className={`h-4 w-4 cursor-pointer`}
                onClick={toggleLike}
              />
            </motion.div>
          </motion.div>
        </li>

        <li>
          <motion.span
            key={likeCount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {`${likeCount} Likes`}
          </motion.span>
        </li>
      </ul>
      <ul className="flex items-center gap-x-2">
        <li>
          <MessageSquare
            className="h-4 w-4 cursor-pointer"
            onClick={() => router.push(`/feed/${feedCode}`)}
          />
        </li>
        <li>
          <motion.span
            key={commentCount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {`${commentCount} Comments`}
          </motion.span>
        </li>
      </ul>
      <ul className="flex items-center gap-x-2">
        <li>
          <Share2 className="h-4 w-4 cursor-pointer" onClick={onShareClick} />
        </li>
        <li className="cursor-pointer" onClick={onShareClick}>
          Share
        </li>
      </ul>
    </div>
  );
}
