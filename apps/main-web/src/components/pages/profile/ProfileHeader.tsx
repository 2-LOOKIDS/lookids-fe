'use client';

import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  loginId: string;
}
export default function ProfileHeader({ loginId }: HeaderProps) {
  return (
    <header className="relative flex justify-center px-5 pt-12">
      <div
        className="absolute left-4 hover:cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        <ChevronLeft />
      </div>
      <h1 className="sr-only">Lookids, 루키즈 | {loginId}</h1>
      <h2 className="font-semibold ">{loginId}</h2>
    </header>
  );
}
