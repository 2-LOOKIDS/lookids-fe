"use client";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useState } from "react";
export default function AddFeedCommentSection({
  feedCode,
}: {
  feedCode: string;
}) {
  // 피드 코드로 댓글을 가져오는 로직
  const [comment, setComment] = useState("");

  return (
    <div className="p-4 mb-20">
      <h4>댓글</h4>
      <Textarea
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="h-[1rem] text-[1rem]   border-gray-300"
      ></Textarea>
    </div>
  );
}
