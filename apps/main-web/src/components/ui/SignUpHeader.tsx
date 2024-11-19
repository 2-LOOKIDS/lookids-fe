'use client';
import { ChevronLeft } from 'lucide-react';

export default function CommonHeader({ title }: { title: string }) {
  return (
    <section className="relative mt-[52px] flex h-12 items-center">
      <ChevronLeft
        className="absolute left-3"
        onClick={() => window.history.back()}
      />
      <p className="flex-1 text-center font-semibold">{title}</p>
    </section>
  );
}
