'use server';

const BASE_URL = `${process.env.BACKEND_URL}/feed-read-service`;

export const getFeedList = async (
  uuid: string,
  page: number = 0,
  size: number = 3
) => {
  const API_URL = `${BASE_URL}/read/feed?uuid=${uuid}&page=${page}&size=${size}`;

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  console.log('🚀 ~ result:', result.result.content);
  return result;
};
