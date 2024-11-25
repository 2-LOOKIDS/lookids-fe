import Image from 'next/image';

export default function CatJelly() {
  return (
    <div className="fixed bottom-0  h-[130px] w-full">
      <Image
        src="/catjelly.png"
        alt="냥젤리"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
