import Link from 'next/link';
import ProfileAvatar from '../../ui/ProfileAvatar';
import React from 'react';
import { SearchContentPet } from '../../../types/search';

interface PetResultListProps {
  result: SearchContentPet[];
}

export function PetResultList({ result }: PetResultListProps) {
  return (
    // <ul className="px-5 pt-5 flex flex-col gap-3">
    <ul className="px-5 pt-5 flex flex-col gap-3">
      {result.map((item, idx) => {
        return <PetResultItem key={idx} content={item} />;
      })}
    </ul>
  );
}

interface PetResultItemProps {
  content: SearchContentPet;
}
export function PetResultItem({ content }: PetResultItemProps) {
  return (
    <li>
      <Link
        href={`user/${content.userNickname}-${content.userTag}`}
        className="flex items-center gap-2"
      >
        <ProfileAvatar
          imgUrl={content.petImage}
          imgAlt={content.petName}
          className="h-10 w-10"
        />
        <p>{content.petName}</p>
        <p>
          {content.userNickname}@{content.userTag}
        </p>
      </Link>
    </li>
  );
}
