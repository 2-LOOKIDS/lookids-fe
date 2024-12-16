import Link from 'next/link';
import ProfileAvatar from '../../ui/ProfileAvatar';

interface UserCardProps {
  nickname: string;
  tag: string;
  image: string;
}

export default function UserCard({ nickname, tag, image }: UserCardProps) {
  return (
    <Link href={`/user/${nickname}-${tag}`} className="flex items-center gap-1">
      <ProfileAvatar imgUrl={image} imgAlt={nickname} className="h-10 w-10" />
      <p className="text-sm">
        {nickname}-{tag}
      </p>
    </Link>
  );
}
