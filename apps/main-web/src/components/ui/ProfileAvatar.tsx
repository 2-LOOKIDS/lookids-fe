import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';

interface ProfileAvatarProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  imgUrl: string;
  imgAlt: string;
}

export default function ProfileAvatar({
  imgAlt,
  imgUrl,
  className,
  ...props
}: ProfileAvatarProps) {
  return (
    // <div className={`relative w-${w} h-${h}`}>
    <div className={cn('relative', className, { ...props })}>
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
          sizes="(max-width: 400px) 50vw"
          priority
          className="rounded-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full">
          <p className="text-[#838383]">{imgAlt}</p>
        </div>
      )}
    </div>
  );
}
