'use server';

export async function recommendPet(mbti: string): Promise<string> {
  // This is a simple recommendation logic. You might want to expand this based on more detailed MBTI characteristics.
  const petRecommendations: { [key: string]: string } = {
    ISTJ: 'Cat',
    ISFJ: 'Dog',
    INFJ: 'Rabbit',
    INTJ: 'Snake',
    ISTP: 'Lizard',
    ISFP: 'Bird',
    INFP: 'Hamster',
    INTP: 'Rat',
    ESTP: 'Ferret',
    ESFP: 'Parrot',
    ENFP: 'Dog',
    ENTP: 'Monkey',
    ESTJ: 'Fish',
    ESFJ: 'Guinea Pig',
    ENFJ: 'Horse',
    ENTJ: 'Lion (if legal and possible!)',
  };

  return petRecommendations[mbti] || 'No specific recommendation';
}
