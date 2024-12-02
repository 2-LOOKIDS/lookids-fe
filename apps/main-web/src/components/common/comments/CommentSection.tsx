'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { getComments, uploadReply } from '../../../actions/feed/comment';
import Comments from './Comments';

export default function CommentSection({ feedCode }: { feedCode: string }) {
  const { data, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite(
      (pageIndex) => `/api/comments/${feedCode}?page=${pageIndex}`,
      (url) => getComments(feedCode, parseInt(url.split('page=')[1])),
      { revalidateOnFocus: false }
    );

  const comments = data ? data.flatMap((page) => page.content) : [];
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [activeReply, setActiveReply] = useState<string | null>(null);

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading &&
      !isValidating
    ) {
      setSize(size + 1);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleReplyChange = (commentCode: string, value: string) => {
    setReplyInputs((prev) => ({
      ...prev,
      [commentCode]: value,
    }));
  };

  const handleReplySubmit = async (
    feedCode: string,
    parentCommentCode: string
  ) => {
    if (!replyInputs[feedCode]?.trim()) return;

    try {
      await uploadReply(feedCode, parentCommentCode, replyInputs[feedCode]);
      mutate(); // 댓글 리스트 갱신
      setReplyInputs((prev) => ({ ...prev, [feedCode]: '' })); // 입력 초기화
      setActiveReply(null); // 입력 필드 숨기기
    } catch (error) {
      console.error('Failed to submit reply:', error);
    }
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.commentCode} className="mb-4">
          <Comments comment={comment} />

          {/* 답글 작성 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setActiveReply(
                activeReply === comment.commentCode ? null : comment.commentCode
              )
            }
            className="mt-2 text-sm text-muted-foreground"
          >
            {activeReply === comment.commentCode ? '취소' : '답글 작성'}
          </Button>

          {/* 대댓글 입력 필드 */}
          {activeReply === comment.commentCode && (
            <div className="mt-2 flex flex-col gap-2">
              <Input
                value={replyInputs[comment.commentCode] || ''}
                onChange={(e) =>
                  handleReplyChange(comment.commentCode, e.target.value)
                }
                placeholder="답글을 입력하세요"
                className="h-auto rounded p-2"
              />
              <Button
                size="sm"
                onClick={() => handleReplySubmit(feedCode, comment.commentCode)}
                className="self-end bg-[#FD9340] px-3 text-xs font-light hover:bg-[#FD9340]/90"
              >
                작성
              </Button>
            </div>
          )}
        </div>
      ))}
      {(isLoading || isValidating) && <div>Loading...</div>}
    </div>
  );
}
