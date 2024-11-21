'use client';

import { ChevronLeft } from 'lucide-react';

export default function CommonHeader({ title }: { title: string }) {
  return (
    <section className="sticky top-0 z-10 flex h-12 items-center bg-white shadow-sm">
      <ChevronLeft
        className="absolute left-3 cursor-pointer"
        onClick={() => window.history.back()}
      />
      <p className="flex-1 text-center font-semibold">{title}</p>
    </section>
  );
}
