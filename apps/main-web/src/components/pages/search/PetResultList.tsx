import React from 'react';
import { SearchContentPet } from '../../../types/search';

interface PetResultListProps {
  result: SearchContentPet[];
}

export function PetResultList({ result }: PetResultListProps) {
  return (
    <div>
      {result.map((item, idx) => {
        return <PetResultItem key={idx} content={item} />;
      })}
    </div>
  );
}

interface PetResultItemProps {
  content: SearchContentPet;
}
export function PetResultItem({ content }: PetResultItemProps) {
  return <div></div>;
}
