import Link from 'next/link';
import ProfileAvatar from '../../ui/ProfileAvatar';
import React from 'react';
import { SearchContentPet } from '../../../types/search';

interface PetResultListProps {
  result: SearchContentPet[];
  query: string;
}

export function PetResultList({ result, query }: PetResultListProps) {
  return result.length === 0 ? (
    <p className="px-5 pt-5">
      <span className="text-lookids">'{query}'</span> 가 포함된 이름을 가진
      동물이 없습니다 ㅠ.ㅠ
    </p>
  ) : (
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
