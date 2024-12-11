'use client';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../../../actions/user';
import { useSession } from '../../../../context/SessionContext';
import { getMediaUrl } from '../../../../utils/media';
export default function AddFeedHeader() {
  const session = useSession();
  const [myProfileImage, setMyProfileImage] = useState<string>('');
  useEffect(() => {
    const uuid = session?.uuid;
    if (!uuid) {
      console.error('UUID is missing.');
      return;
    }
    const fetchMyProfile = async () => {
      try {
        const data = await getUserProfile(uuid);
        setMyProfileImage(data.image);
      } catch (error) {
        console.error('Failed to fetch my profile:', error);
      }
    };
    fetchMyProfile();
  });

  return (
    <div className="flex h-[52px] items-center justify-between border-b px-4  ">
      <Link href="/" className="p-2">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <h1 className="text-center font-semibold">FEED</h1>
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={getMediaUrl(myProfileImage)}
          alt="Profile"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    </div>
  );
}
