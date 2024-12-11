'use client';

import { motion } from 'framer-motion';
import { Share2, ThumbsUp } from 'lucide-react';

interface SocialCardReactionProps {
  isLiked: boolean;
  likeCount: number;
  onToggleLike: () => void;
  onShareClick: () => void;
}

export default function SocialCardReaction({
  isLiked,
  likeCount,
  onToggleLike,
  onShareClick,
}: SocialCardReactionProps) {
  return (
    <div className="flex gap-x-5 border-t border-gray-100 px-2 py-3 text-xs text-gray-400">
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
          <Share2
            className="text-lookids h-4 w-4 cursor-pointer"
            onClick={onShareClick}
          />
        </li>
        <li className="cursor-pointer" onClick={onShareClick}>
          공유하기
        </li>
      </ul>
    </div>
  );
}
