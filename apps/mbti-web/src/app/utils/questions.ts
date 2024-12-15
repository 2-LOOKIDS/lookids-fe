export interface Question {
  question: string;
  options: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
}

const questions: Question[] = [
  {
    question: '집에 있을 때, 어떤 시간을 선호하나요?',
    options: [
      { label: '활동적인 시간', value: 'E', icon: '🏃‍♂️' },
      { label: '조용히 쉬는 시간', value: 'I', icon: '🧘‍♀️' },
    ],
  },
  {
    question: '동물과의 소통에서, 무엇을 중요시하나요?',
    options: [
      { label: '감정을 중요시', value: 'F', icon: '❤️' },
      { label: '논리를 중요시', value: 'T', icon: '🧠' },
    ],
  },
  {
    question: '새로운 동물을 입양할 때, 어떤 방식을 선호하나요?',
    options: [
      { label: '즉흥적으로 선택', value: 'P', icon: '🎭' },
      { label: '계획을 세워 신중히 결정', value: 'J', icon: '📝' },
    ],
  },
  {
    question: '동물을 돌보는 과정에서, 어떤 방식을 선호하나요?',
    options: [
      { label: '정해진 루틴을 따르기', value: 'S', icon: '🕰️' },
      { label: '유연하게 돌보기', value: 'N', icon: '🌈' },
    ],
  },
];

export function getQuestion(id: number): Question | undefined {
  return questions[id];
}

export function determineMBTI(answers: string[]): string {
  const counts: { [key: string]: number } = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  answers.forEach((answer) => {
    counts[answer]++;
  });

  const mbti = [
    counts.E > counts.I ? 'E' : 'I',
    counts.S > counts.N ? 'S' : 'N',
    counts.T > counts.F ? 'T' : 'F',
    counts.J > counts.P ? 'J' : 'P',
  ].join('');

  return mbti;
}
