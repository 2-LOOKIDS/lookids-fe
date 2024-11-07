import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function AddFeedHeader() {
  return (
    <div className="flex items-center justify-between px-4 h-[52px] border-b  ">
      <Link href="/" className="p-2">
        <ChevronLeft className="w-6 h-6" />
      </Link>
      <h1 className="text-center font-semibold">FEED</h1>
      <div className="w-10 h-10 rounded-full overflow-hidden">
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
