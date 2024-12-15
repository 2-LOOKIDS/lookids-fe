'use client';

import { SearchWordSchema, SearchWordType } from '../../types/search';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@repo/ui/components/ui/input';
import { X } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

  const {
    register,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SearchWordType>({
    resolver: zodResolver(SearchWordSchema),
    defaultValues: {
      searchWord: initialValue ?? '',
    },
  });

  const searchWord = watch('searchWord');
  const [debouncedSearchValue] = useDebounce(searchWord, 300);

  useEffect(() => {
    const currentTab = searchParams.get('tab') || currentTabRef.current;
    currentTabRef.current = currentTab;
    const result = SearchWordSchema.safeParse({
      searchWord: debouncedSearchValue.trim(),
    });

    if (debouncedSearchValue.trim() && result.success) {
      router.push(
        `/search?tab=${currentTab}&q=${encodeURIComponent(debouncedSearchValue.trim())}`
      );
    } else if (debouncedSearchValue.trim() === '') {
      router.push(`/search?tab=${currentTab}`);
    }
  }, [debouncedSearchValue, router, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const result = SearchWordSchema.safeParse({ searchWord: value });

    if (!result.success) {
      setError('searchWord', {
        type: 'manual',
        message:
          result.error.errors[0]?.message || '특수 문자는 허용되지 않습니다.',
      });
    } else {
      clearErrors('searchWord');
      setValue('searchWord', value, { shouldValidate: true });
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center text-[16px] justify-center gap-2"
    >
      <Input
        {...register('searchWord')}
        autoFocus
        placeholder="검색어를 입력해주세요"
        onChange={handleInputChange}
        className="text-[16px]"
      />
      <div onClick={onClose}>
        <X color="#ffa200" size={22} />
      </div>
    </form>
  );
}
