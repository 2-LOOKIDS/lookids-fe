import { ChevronLeft } from "lucide-react";

export default function CommonHeader({ title }: { title: string }) {
  return (
    <section className="mt-[52px] h-12 flex items-center relative">
      <ChevronLeft
        className="absolute left-3"
        onClick={() => window.history.back()}
      />
      <p className="font-semibold text-center flex-1">{title}</p>
    </section>
  );
}
