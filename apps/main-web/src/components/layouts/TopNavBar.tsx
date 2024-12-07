'use client';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import NavMenus from './NavMenus';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function TopNavBar({ onMenuClick }: HeaderProps) {
  const isView = useScrollVisibility();

  return (
    <header
      className={`flex justify-between items-center px-4 py-[0.8rem] transition-transform duration-300 
      fixed top-0 left-0 right-0 z-[20]
      backdrop-blur-md
      ${isView ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <NavMenus onMenuClick={onMenuClick} />
    </header>
  );
}
