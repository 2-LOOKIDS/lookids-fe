// utils/scrollToBottom.ts
export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    ref.current.scrollTop = ref.current.scrollHeight;
  }
};
