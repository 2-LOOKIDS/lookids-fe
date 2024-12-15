'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { recommendPet } from '../utils/pets';
import { determineMBTI } from '../utils/questions';

export default function RecommendationPage() {
  const [mbti, setMbti] = useState<string>('');
  const [recommendedPet, setRecommendedPet] = useState<{
    name: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('mbtiAnswers') || '[]');
    const calculatedMbti = determineMBTI(answers);
    setMbti(calculatedMbti);
    const [pet] = recommendPet(calculatedMbti);
    setRecommendedPet(pet);
  }, []);

  if (!mbti || !recommendedPet) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border-2 border-[#fd9340]">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-[#fd9340] mb-4">
            MBTI 동물 추천
          </h1>
          <p className="text-base sm:text-lg text-center mb-4 sm:mb-6">
            당신의 MBTI 유형: <strong>{mbti}</strong>
          </p>
          <div className="text-center">
            <Image
              src={recommendedPet.image}
              alt={recommendedPet.name}
              width={250}
              height={250}
              className="rounded-xl mb-4 mx-auto"
            />
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#fd9340]">
              추천 동물: {recommendedPet.name}
            </h2>
          </div>
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-center gap-4 ">
          <Link
            href="/"
            className="px-6 py-2 bg-[#565453] text-white rounded-xl hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base"
          >
            다시 테스트하기
          </Link>
          <Link
            href={`https://www.lookids.online/search?tab=feed&q=${recommendedPet.name}`}
            className="px-6 py-2 bg-[#fd9340] text-white rounded-xl hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base"
          >
            루키즈에서 더 알아보기
          </Link>
        </div>
      </div>
    </div>
  );
}
