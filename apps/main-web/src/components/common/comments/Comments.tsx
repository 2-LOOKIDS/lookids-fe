import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import CommentLike from './CommentLike';

export default function Comments({ commentCode }: { commentCode: string }) {
  // 여기서는 commentCode를 받아와서 해당 comment에 대한 정보를 불러올 예정.
  return (
    <div className="flex w-full flex-col gap-2 px-2 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/jihunpistol.jpg" alt="User avatar" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">JIHOON_SHIN</span>
            <span className="text-muted-foreground text-[11px]">
              24.11.12 05:22:15
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
            내 이름은 신지훈. 이번 프로젝트가 끝나면 고향에 돌아가
            <br />
            그녀에게 고백할꺼야.
          </p>
        </section>

        <CommentLike commendCode={commentCode}></CommentLike>
      </section>
      <div className="h-px w-full bg-[#CFCDCD] opacity-50" />
    </div>
  );
}
