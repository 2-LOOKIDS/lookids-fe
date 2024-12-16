interface PetRecommendation {
  name: string;
  image: string;
}

export function recommendPet(mbti: string): PetRecommendation[] {
  const recommendations: { [key: string]: PetRecommendation[] } = {
    ISTJ: [{ name: '거북이', image: '/pets/거북이.png' }],
    ISFJ: [{ name: '고양이', image: '/pets/고양이.png' }],
    INFJ: [
      {
        name: '시베리안허스키',
        image: '/pets/시베리안허스키.png',
      },
    ],
    INTJ: [{ name: '도마뱀', image: `/pets/도마뱀.png` }],
    ISTP: [{ name: '햄스터', image: `/pets/햄스터.png` }],
    ISFP: [{ name: '토끼', image: `/pets/토끼.png` }],
    INFP: [{ name: '카나리아', image: `/pets/고양이.png` }],
    INTP: [{ name: '기니피그', image: `/pets/거북이.png` }],
    ESTP: [{ name: '시바견', image: `/pets/시바견.png` }],
    ESFP: [{ name: '퍼그', image: `/pets/퍼그.png` }],
    ENFP: [{ name: '보더콜리', image: `/pets/보더콜리.png` }],
    ENTP: [{ name: '페럿', image: `/pets/페럿.png` }],
    ESTJ: [{ name: '골든리트리버', image: `/pets/골든리트리버.png` }],
    ESFJ: [{ name: '비글', image: `/pets/비글.png` }],
    ENFJ: [
      {
        name: '레브라도리트리버',
        image: `/pets/.png`,
      },
    ],
    // 앵무새
    ENTJ: [{ name: '앵무새', image: `/pets/도마뱀.png` }],
  };

  return (
    recommendations[mbti] || [
      {
        name: '추천 동물이 없습니다.',
        image: '/placeholder.svg?height=300&width=300',
      },
    ]
  );
}
