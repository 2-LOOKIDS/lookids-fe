'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import { Input } from '@repo/ui/components/ui/input';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';
import { uploadComment } from '../../../actions/feed/comment';
import { getUserProfile } from '../../../actions/user';
import { useSession } from '../../../context/SessionContext';
import { getMediaUrl } from '../../../utils/media';

export default function AddFeedCommentSection({
  feedCode,
}: {
  feedCode: string;
}) {
  const session = useSession();
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [myNickName, setMyNickName] = useState('');
  const [myProfileImage, setMyProfileImage] = useState('');
  const maxLength = 300;

  useEffect(() => {
    const uuid = session?.uuid;
    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }

    const getMyNickName = async () => {
      try {
        const data = await getUserProfile(uuid);
        setMyNickName(data.nickname);
        setMyProfileImage(data.image);
      } catch (error) {
        console.error('Failed to fetch my nickname:', error);
      }
    };
    getMyNickName();
  }, []);
  const handleComment = async () => {
    try {
      // 댓글 업로드 요청
      await uploadComment(feedCode, comment);

      // SWR의 데이터를 갱신하여 최신 댓글 리스트 반영
      mutate(`/api/comments/${feedCode}`);

      // 입력값 초기화 및 상태 변경
      setComment('');
      setIsCommenting(false);
    } catch (error) {
      console.error('Error uploading comment:', error);
    }
  };

  return (
    <Card className="w-full border-[rgba(18,18,18,0.2)]">
      {(isCommenting || comment) && (
        <CardContent className="p-2">
          <div className="flex items-center gap-2 py-2">
            <Avatar>
              <AvatarImage
                className="rounded-full"
                src={getMediaUrl(myProfileImage)}
              />
              <AvatarFallback>{myNickName}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-[#4F4F4F]">{myNickName}</span>
          </div>
        </CardContent>
      )}
      <CardFooter className="p-2">
        <div className="flex w-full flex-col gap-2">
          <Input
            value={comment}
            onFocus={() => setIsCommenting(true)}
            onBlur={() => setIsCommenting(false)}
            onChange={(e) => setComment(e.target.value.slice(0, maxLength))}
            placeholder="댓글을 입력하세요"
            className="h-auto rounded border-0 p-2 text-[16px]"
          />
          {(isCommenting || comment) && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#838688]">
                {comment.length}/{maxLength}
              </span>
              <Button
                size="sm"
                onClick={handleComment}
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
