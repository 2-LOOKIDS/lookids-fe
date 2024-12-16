import { notFound } from 'next/navigation';
import MBTIQuestionForm from '../../components/MBTIQuestionForm';
import { getQuestion } from '../../utils/questions';

export default function QuestionPage({ params }: { params: { id: string } }) {
  const questionId = parseInt(params.id, 10);
  const question = getQuestion(questionId);

  if (!question) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border-2 border-[#fd9340]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#fd9340] mb-4 sm:mb-6">
            Lookids MBTI Pet Recommender
          </h1>
          <MBTIQuestionForm question={question} questionId={questionId} />
        </div>
      </div>
    </main>
  );
}
