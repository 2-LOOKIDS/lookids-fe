'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { useState } from 'react';

export default function FeedCommentSection() {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const maxLength = 300;

  return (
    <Card className="w-full border-[rgba(18,18,18,0.2)] bg-[rgba(255,239,231,0.5)]">
      {(isCommenting || comment) && (
        <CardContent>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage className="rounded-full" src="/jihunpistol.jpg" />
              <AvatarFallback>KB</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-[#4F4F4F]">Jihun_SIN</span>
          </div>
        </CardContent>
      )}
      <CardFooter className="bg-[rgba(255,239,231,0.5)] p-2">
        <div className=" flex w-full flex-col gap-2">
          <Input
            value={comment}
            onFocus={() => setIsCommenting(true)}
            onBlur={() => setIsCommenting(false)}
            onChange={(e) => setComment(e.target.value.slice(0, maxLength))}
            placeholder="댓글을 입력하세요"
            className="h-auto resize-none rounded border p-2 text-[16px]"
          />

          {(isCommenting || comment) && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#838688]">
                {comment.length}/{maxLength}
              </span>
              <Button
                size="sm"
                className="h-7 bg-[#FD9340] px-3 text-xs font-light hover:bg-[#FD9340]/90"
              >
                댓글 달기
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
