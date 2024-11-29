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
    // 오늘이 아니면 날짜만 반환
    return date.toLocaleDateString();
  }
};
