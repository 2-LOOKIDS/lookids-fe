import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { CommentType } from '../../../types/feed/CommentType';
import { formatDate } from '../../../utils/formatDate';
import { getMediaUrl } from '../../../utils/media';
import CommentLike from './CommentLike';

export default function Comments({ comment }: { comment: CommentType }) {
  // 여기서는 commentCode를 받아와서 해당 comment에 대한 정보를 불러올 예정.
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
        {/* <button className="opacity-60 transition-opacity hover:opacity-100">
          <Trash2 className="text-lookids " />
        </button> */}
      </div>
      <section className="flex justify-between">
        <section className="flex justify-between gap-x-4">
          <p className="text-[13px] leading-5 text-[#A2A2A2]">
            {comment.content}
          </p>
        </section>

        <CommentLike commendCode={comment.commentCode}></CommentLike>
      </section>
      <div className="h-px w-full bg-[#CFCDCD] opacity-50" />
    </div>
  );
}
