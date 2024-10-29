import Image from "next/image";

export default function CatJelly() {
  return (
    <div className="relative w-full h-[250px] mt-8">
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
