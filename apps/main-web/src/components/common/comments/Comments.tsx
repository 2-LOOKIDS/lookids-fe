'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { getCommentReply } from '../../../actions/feed/comment';
import { CommentReplyType, CommentType } from '../../../types/feed/CommentType';
import { formatDate } from '../../../utils/formatDate';
import { getMediaUrl } from '../../../utils/media';
import CommentLike from './CommentLike';

export default function Comments({ comment }: { comment: CommentType }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<CommentReplyType[]>([]);

  // 대댓글 데이터를 가져오는 함수
  const getCommentReplies = async () => {
    try {
      const response = await getCommentReply(comment.commentCode);
      setReplies(response);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  // 버튼을 눌렀을 때 대댓글 표시/숨기기 처리
  const toggleReplies = async () => {
    if (!showReplies && replies.length === 0) {
      await getCommentReplies();
    }
    setShowReplies(!showReplies);
  };

  return (
    <div className="flex w-full flex-col gap-2 px-2 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={getMediaUrl(comment.image)}
              alt={comment.nickname}
            />
            <AvatarFallback>{comment.nickname}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{comment.nickname}</span>
            <span className="text-muted-foreground text-[11px]">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <section className="flex justify-between">
        <section className="flex flex-col gap-y-2 w-full">
          <p className="text-[13px] leading-5 text-[#A2A2A2]">
            {comment.content}
          </p>
          {comment.replyCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="self-start text-muted-foreground"
              onClick={toggleReplies}
            >
              {showReplies ? (
                <>
                  <ChevronUp className="mr-1 h-4 w-4" />
                  Hide Replies
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-4 w-4" />
                  View {comment.replyCount}{' '}
                  {comment.replyCount === 1 ? 'Reply' : 'Replies'}
                </>
              )}
            </Button>
          )}
          {showReplies && (
            <div className="pl-4 border-l border-gray-200">
              {replies.map((reply) => (
                <Comments key={reply.commentCode} comment={reply} />
              ))}
            </div>
          )}
        </section>
        <CommentLike commendCode={comment.commentCode} />
      </section>
      <div className="h-px w-full bg-[#CFCDCD] opacity-50" />
    </div>
  );
}
