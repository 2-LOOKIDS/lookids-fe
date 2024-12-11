'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SocialCardReactionProps {
  feedCode: string;
  isLiked: boolean;
  likeCount: number;
  commentCount: number;
  onToggleLike: () => void;
  onShareClick: () => void;
}

export default function SocialCardReaction({
  feedCode,
  isLiked,
  likeCount,
  commentCount,
  onToggleLike,
  onShareClick,
}: SocialCardReactionProps) {
  const router = useRouter();
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
                onClick={onToggleLike}
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
          <motion.div
            animate={{
              scale: isLiked ? [0.8, 1.2, 0.8] : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            <MessageSquare
              className="text-lookids"
              onClick={() => router.push(`/feed/${feedCode}`)}
            />
          </motion.div>
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
          <Share2
            className="text-lookids h-4 w-4 cursor-pointer"
            onClick={onShareClick}
          />
        </li>
        <li className="cursor-pointer" onClick={onShareClick}>
          Share
        </li>
      </ul>
    </div>
  );
}
