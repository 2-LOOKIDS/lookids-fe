"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter } from "@repo/ui/components/ui/card";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useState } from "react";

export default function FeedCommentSection() {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const maxLength = 300;

  return (
    <Card className="w-full bg-[rgba(255,239,231,0.5)] border-[rgba(18,18,18,0.2)]">
      {(isCommenting || comment) && (
        <CardContent className="p-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage className="rounded-full" src="/jihunpistol.jpg" />
              <AvatarFallback>KB</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-[#4F4F4F]">Jihun_SIN</span>
          </div>
        </CardContent>
      )}
      <CardFooter className="p-2 bg-[rgba(255,239,231,0.5)]">
        <div className=" flex flex-col w-full gap-2">
          <Textarea
            value={comment}
            onFocus={() => setIsCommenting(true)}
            onBlur={() => setIsCommenting(false)}
            onChange={(e) => setComment(e.target.value.slice(0, maxLength))}
            placeholder="댓글을 입력하세요"
            className="resize-none text-[16px] h-auto p-2 rounded border"
          />

          {(isCommenting || comment) && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#838688]">
                {comment.length}/{maxLength}
              </span>
              <Button
                size="sm"
                className="h-7 px-3 bg-[#FD9340] hover:bg-[#FD9340]/90 text-xs font-light"
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
