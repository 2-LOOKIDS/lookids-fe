import Image from "next/image";

export default function LookidsLogo() {
  return (
    <div className="mt-16">
      <Image
        src="/lookids.png"
        alt={"루키즈"}
        layout="intrinsic"
        width={300}
        height={150}
        priority
      />
    </div>
  );
}
