export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1);
    return formatted.endsWith('.0')
      ? `${Math.floor(num / 1000000)}M`
      : `${formatted}M`;
  } else if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    return formatted.endsWith('.0')
      ? `${Math.floor(num / 1000)}k`
      : `${formatted}k`;
  } else {
    return num.toString();
  }
};
