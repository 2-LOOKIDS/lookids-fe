'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@repo/ui/components/ui/input';
import { X } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useForm } from 'react-hook-form';

interface SearchBarProps {
  onClose: () => void;
  initialValue?: string;
}
interface FormValues {
  searchWord: string;
}

export default function SearchBar({ onClose, initialValue }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTabRef = useRef<string>(searchParams.get('tab') || 'user');
  const { register, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      searchWord: initialValue ?? '',
    },
  });

  const searchWord = watch('searchWord');
  const [debouncedSearchValue] = useDebounce(searchWord, 300);

  useEffect(() => {
    if (debouncedSearchValue.trim()) {
      const currentTab = searchParams.get('tab') || currentTabRef.current;
      currentTabRef.current = currentTab;
      router.push(
        `/search?tab=${currentTab}&q=${encodeURIComponent(debouncedSearchValue.trim())}`
      );
    } else if (window.location.pathname === '/search') {
      router.push(`/search?tab=${currentTabRef.current}`);
    }
  }, [debouncedSearchValue, router, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('searchWord', e.target.value);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Input
        {...register('searchWord')}
        autoFocus
        placeholder="검색어를 입력해주세요"
        onChange={handleInputChange}
      />
      <div onClick={onClose}>
        <X color="#ffa200" size={22} />
      </div>
    </div>
  );
}
