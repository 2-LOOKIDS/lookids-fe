'use client';

import { ReactNode, useState } from 'react';

import BottomAppBar from '../../components/layouts/BottomAppBar';
import { Sidebar } from '../../components/layouts/SideBar';
import TopNavBar from '../../components/layouts/TopNavBar';

interface LayoutProps {
  children: ReactNode;
}

export default function layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <ScrollToTopButton /> */}
      <TopNavBar onMenuClick={() => setSidebarOpen(true)} />
      <div className={`flex flex-1 ${sidebarOpen} ? : overflow-auto`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      {children}
      <footer>
        <BottomAppBar />
      </footer>
    </>
  );
}
