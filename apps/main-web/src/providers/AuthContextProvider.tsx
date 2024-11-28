'use client';
import React from 'react';
import { SessionContext } from '../context/SessionContext';

export const AuthContextProvider = ({
  isAuth,
  uuid,
  accessToken,
  children,
}: {
  isAuth: boolean;
  uuid: string;
  accessToken: string;
  children: React.ReactNode;
}) => {
  return (
    <SessionContext.Provider value={{ isAuth, uuid, accessToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export default AuthContextProvider;
