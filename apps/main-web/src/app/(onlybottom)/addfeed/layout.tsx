import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '피드 작성',
};

export default function layout({ children }: LayoutProps) {
  return <>{children}</>;
}
