import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
export default function AddFeedHeader() {
  return (
    <div className="flex h-[52px] items-center justify-between border-b px-4  ">
      <Link href="/" className="p-2">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <h1 className="text-center font-semibold">FEED</h1>
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <Image
          src="/jihunpistol.jpg"
          alt="Profile"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    </div>
  );
}
