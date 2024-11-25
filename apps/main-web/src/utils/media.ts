export const getMediaUrl = (media: string) => {
  return `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}${media}`;
};

export const extractCommonUrl = (media: string) => {
  const mediaBaseUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || '';
  return media.replace(mediaBaseUrl, '');
};
