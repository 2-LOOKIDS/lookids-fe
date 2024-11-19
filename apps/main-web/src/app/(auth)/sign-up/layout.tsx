import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <h1 className="sr-only">Lookids, 루키즈 | 회원가입</h1>
      </header>
      {children}
    </>
  );
}
