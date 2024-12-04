import React from 'react';

interface ProfileDescriptionProps {
  comment: string;
}

export default function ProfileDescription({
  comment,
}: ProfileDescriptionProps) {
  return (
    <section className="flex flex-col px-6 pt-4">
      <p className="pt-2.5 text-[12px] text-[#838383]">{comment}</p>
    </section>
  );
}
