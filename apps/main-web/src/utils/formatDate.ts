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

export const formatDateString = (dateString: string) => {
  // 입력된 문자열을 '-'로 분리
  const parts = dateString.split('-');

  // 연도, 월, 일을 추출
  const year = parts[0].slice(-2); // 연도의 마지막 두 자리
  const month = parts[1].padStart(2, '0'); // 월을 두 자리로
  const day = parts[2].padStart(2, '0'); // 일을 두 자리로

  // 형식에 맞게 결합하여 반환
  return `${year}${month}${day}`;
};

export function formatStringDate(string: string) {
  // 입력 문자열이 8자리인지 확인
  if (string.length !== 8) {
    throw new Error('입력 문자열은 8자리여야 합니다.');
  }

  // 연도, 월, 일 추출
  const year = string.substring(0, 4);
  const month = string.substring(4, 6);
  const day = string.substring(6, 8);

  // 형식에 맞게 반환
  return `${year}-${month}-${day}`;
}
