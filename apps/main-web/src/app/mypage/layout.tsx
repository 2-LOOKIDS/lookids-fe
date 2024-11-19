import CommonHeader from '../../components/ui/SignUpHeader';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  return (
    <>
      <header>
        <CommonHeader title={'MY PAGE'} />
      </header>
      {children}
    </>
  );
}
