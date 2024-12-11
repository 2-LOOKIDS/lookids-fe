'use client';

import React from 'react';
import SearchBar from '../../common/SearchBar';
import { useRouter } from 'next/navigation';

interface SearchHeaderProps {
  initialValue: string;
}
export default function SearchHeader({ initialValue }: SearchHeaderProps) {
  const router = useRouter();
  const handleClose = () => {
    router.push('/');
  };
  return (
    <div className="w-full px-4">
      <SearchBar initialValue={initialValue} onClose={handleClose} />
    </div>
  );
}
