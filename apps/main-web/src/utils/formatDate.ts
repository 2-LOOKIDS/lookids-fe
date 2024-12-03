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
