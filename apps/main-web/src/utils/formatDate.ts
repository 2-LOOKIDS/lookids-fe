export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();

  // 오늘인지 확인 (년, 월, 일이 같은지 비교)
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  if (isToday) {
    // 오늘이면 시간만 반환
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    // 오늘이 아니면 "MM. DD." 형식으로 반환
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}월 ${day}일`;
  }
};

export const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate);
  const today = new Date();

  const age = today.getFullYear() - birth.getFullYear();
  return age;
};

// 'YYYY-MM-DD' -> YYYYMMDD
export const formatDateString = (dateString: string) => {
  if (!dateString || !dateString.trim()) {
    return null;
  }

  const parts = dateString.split('-');

  const year = parts[0]; // 년도
  const month = parts[1].padStart(2, '0'); // 월 2자리로 맞추기
  const day = parts[2].padStart(2, '0'); // 일 2자리로 맞추기
  const result = Number(`${year}${month}${day}`);

  return result;
};

export const formatDateFromNumber = (
  dateNumber: number | null
): string | null => {
  // 숫자를 문자열로 변환
  if (!dateNumber) {
    return null;
  }
  const dateString = dateNumber.toString();

  // 8자리 숫자여야 하므로 길이 체크
  if (dateString.length !== 8) {
    console.error('잘못된 날짜 형식입니다. 8자리 숫자가 필요합니다.');
    return null;
  }

  // 연, 월, 일을 분리
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  // 'YYYY-MM-DD' 형식으로 반환
  return `${year}-${month}-${day}`;
};
