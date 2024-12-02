'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import { ChevronDown, ChevronUp, Reply } from 'lucide-react';
import { useState } from 'react';
import { getCommentReply, uploadReply } from '../../../actions/feed/comment';
import { CommentReplyType, CommentType } from '../../../types/feed/CommentType';
import { formatDate } from '../../../utils/formatDate';
import { getMediaUrl } from '../../../utils/media';
import CommentLike from './CommentLike';

export default function Comments({
  comment,
  feedCode,
}: {
  comment: CommentType;
  feedCode: string;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<CommentReplyType[]>([]);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  // 대댓글 데이터를 가져오는 함수
  const getCommentReplies = async () => {
    try {
      const response = await getCommentReply(comment.commentCode);
      console.log(response);
      setReplies(response);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  // 버튼을 눌렀을 때 대댓글 표시/숨기기 처리
  const toggleReplies = async () => {
    if (!showReplies) {
      await getCommentReplies();
    }
    setShowReplies(!showReplies);
  };

  // 대댓글 작성 핸들러
  const handleReplySubmit = async () => {
    if (replyContent.trim()) {
      await uploadReply(feedCode, comment.commentCode, replyContent);
      setReplyContent('');
      await getCommentReplies();
      setIsReplying(false);
    }
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
          <section className="flex items-center gap-3">
            <p className="text-[16px] leading-5 text-[#A2A2A2]">
              {comment.content}
            </p>
            <Reply size={15} color="#A2A2A2" onClick={toggleReplies}></Reply>
          </section>
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
                  숨기기
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-4 w-4" />
                  {comment.replyCount}개의{' '}
                  {comment.replyCount === 1 ? '답글' : '답글들'}
                </>
              )}
            </Button>
          )}
          {showReplies && (
            <div className="pl-4 border-l border-gray-200">
              {replies.map((reply) => (
                <div
                  key={reply.uuid}
                  className="flex items-start gap-3 py-2 border-b border-gray-100"
                >
                  <Avatar>
                    <AvatarImage
                      src={getMediaUrl(reply.image)}
                      alt={reply.nickname}
                    />
                    <AvatarFallback>{reply.nickname}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {reply.nickname}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        @{reply.tag}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{reply.content}</p>
                  </div>
                </div>
              ))}
              {isReplying ? (
                <div className="mt-2 flex flex-col gap-2">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm"
                    placeholder="Write a reply..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleReplySubmit}>
                      Submit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsReplying(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-blue-500"
                  onClick={() => setIsReplying(true)}
                >
                  답글 쓰기
                </Button>
              )}
            </div>
          )}
        </section>
        <CommentLike commendCode={comment.commentCode} />
      </section>
      <div className="h-px w-full bg-[#CFCDCD] opacity-50" />
    </div>
  );
}
