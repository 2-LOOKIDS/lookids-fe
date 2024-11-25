'use client';
import React from 'react';
import { SessionContext } from '../context/SessionContext';

export const AuthContextProvider = ({
  isAuth,
  uuid,
  children,
}: {
  isAuth: boolean;
  uuid: string;
  children: React.ReactNode;
}) => {
  return (
    <SessionContext.Provider value={{ isAuth, uuid }}>
      {children}
    </SessionContext.Provider>
  );
};

export default AuthContextProvider;
