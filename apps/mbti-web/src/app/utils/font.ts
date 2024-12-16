import { Noto_Sans_KR } from 'next/font/google';

export const notoSansKr = Noto_Sans_KR({ subsets: ['latin'], weight: ['400'] });

export const genderColor = (gender: string | null) => {
  switch (gender) {
    case '남자':
      return 'text-blue-400';
    case '여자':
      return 'text-pink-400';
    default:
      return 'text-black';
  }
};
