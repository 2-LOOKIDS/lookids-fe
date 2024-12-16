'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LookidsLogo() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/')}
      className="mx-auto pt-12 hover: cursor-pointer"
    >
      <Image
        src="/lookids.png"
        alt={'루키즈'}
        layout="intrinsic"
        width={200}
        height={150}
        priority
      />
    </div>
  );
}
