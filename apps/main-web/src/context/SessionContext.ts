'use client';
import { createContext, useContext } from 'react';

// Context 생성: 기본값을 { isAuth: boolean | null, uuid: string | null }로 설정
export const SessionContext = createContext<{
  isAuth: boolean | null;
  uuid: string | null;
  accessToken: string | null;
}>({
  isAuth: null,
  uuid: null,
  accessToken: null,
});

// 커스텀 훅
export const useSession = () => useContext(SessionContext);
