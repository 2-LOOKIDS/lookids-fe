'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@repo/ui/components/ui/input';
import { useForm } from 'react-hook-form';

// interface SearchBarProps {
//   setOpen: (open: boolean) => void;
// }
interface FormValues {
  searchWord: string;
}

// export default function SearchBar({ setOpen }: SearchBarProps) {
export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      searchWord: '',
    },
  });

  const searchWord = watch('searchWord');

  useEffect(() => {
    const word = searchParams.get('word');
    if (word) {
      setValue('searchWord', word);
      setIsOpen(true);
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearchClick = () => {
    setValue('searchWord', '');
    setIsOpen(!isOpen);
  };

  const handleSearchClose = () => {
    setValue('searchWord', '');
    console.log('close');
    router.push('/');
  };

  const onSubmit = (values: FormValues) => {
    if (values.searchWord) {
      router.push(`/search?word=${encodeURIComponent(values.searchWord)}`);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchWord && searchWord.length >= 1) {
        router.push(`/search?word=${encodeURIComponent(searchWord)}`);
      } else {
        router.push('/');
      }
      // if (searchWord && searchWord.length >= 1) {
      //   router.push(`/search?word=${encodeURIComponent(searchWord)}`);
      // } else if (searchWord === '') {
      //   if (pathname.includes('/search')) {
      //     router.push('/');
      //   } else {
      //     router.push(pathname);
      //   }
      // }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchWord]);

  return (
    <div className="flex items-center gap-2">
      {/* <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center"> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className="w-[90%]"
          autoFocus={true}
          {...register('searchWord')}
          ref={(e) => {
            inputRef.current = e;
            register('searchWord').ref(e);
          }}
          placeholder="검색어를 입력해주세요"
        />
      </form>
      <div onClick={() => handleSearchClose}>
        <X color="#ffa200" size={22} />
      </div>
    </div>
  );
}
