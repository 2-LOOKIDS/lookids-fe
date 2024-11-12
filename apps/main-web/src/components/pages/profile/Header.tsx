'use client';

import { ChevronLeft } from 'lucide-react';

interface HeaderProps {
  loginId: string;
}
export default function Header({ loginId }: HeaderProps) {
  return (
    <header className="relative flex justify-center px-5 pt-12">
      <div className="absolute left-4" onClick={() => window.history.back()}>
        <ChevronLeft />
      </div>
      <p className="font-semibold ">{loginId}</p>
    </header>
  );
}
