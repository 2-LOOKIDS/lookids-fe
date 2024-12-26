'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const animalEmojis = ['🐶', '🐱', '🐰', '🐦', '🐠', '🐢', '🦜', '🐹'];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border-2 border-[#fd9340] p-8 relative">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#fd9340] mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          MBTI로 알아보는 나의 반려동물
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-center mb-8 text-gray-600"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          당신의 성격에 꼭 맞는 반려동물을 찾아보세요!
        </motion.p>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/question/0"
            className="px-8 py-3 bg-[#fd9340] text-white rounded-xl text-xl font-bold hover:bg-orange-600 transition-colors duration-300 shadow-lg"
          >
            테스트 시작하기
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
