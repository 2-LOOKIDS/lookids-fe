'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Question } from '../utils/questions';

interface MBTIQuestionFormProps {
  question: Question;
  questionId: number;
}

export default function MBTIQuestionForm({
  question,
  questionId,
}: MBTIQuestionFormProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Clear answers when starting a new test
    if (questionId === 0) {
      localStorage.removeItem('mbtiAnswers');
    }
  }, [questionId]);

  const handleAnswer = (answer: string) => {
    setIsTransitioning(true);
    const currentAnswers = JSON.parse(
      localStorage.getItem('mbtiAnswers') || '[]'
    );
    const newAnswers = [...currentAnswers, answer];
    localStorage.setItem('mbtiAnswers', JSON.stringify(newAnswers));

    if (questionId < 3) {
      router.push(`/question/${questionId + 1}`);
    } else {
      router.push('/recommendation');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
        {question.question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.value)}
            className="w-full h-full bg-white border-2 border-[#fd9340] rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fd9340] focus:ring-opacity-50"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <span
                className="text-4xl sm:text-5xl"
                role="img"
                aria-label={option.label}
              >
                {option.icon}
              </span>
              <p className="text-sm sm:text-base font-medium text-center text-[#fd9340]">
                {option.label}
              </p>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">Question {questionId + 1} of 4</p>
        <button
          onClick={() =>
            router.push(`/question/${Math.max(0, questionId - 1)}`)
          }
          disabled={questionId === 0}
          className="px-4 py-2 border border-[#fd9340] text-[#fd9340] rounded-md hover:bg-[#fd9340] hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
      </div>
    </motion.div>
  );
}
