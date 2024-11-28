'use client';
import React from 'react';
import MainHamburger from '../icons/topNavBar/MainHamburger';
import MainTopLogo from '../icons/topNavBar/MainTopLogo';
import BellTest from '../icons/topNavBar/MainTopBell';
import MainTopSearch from '../icons/topNavBar/MainTopSearch';
import NavMenuItem from './NavMenuItem';

interface HeaderProps {
  onMenuClick: () => void;
}

function NavMenus({ onMenuClick }: HeaderProps) {
  return (
    <nav className="flex w-full justify-between">
      <ul className="flex items-center gap-x-2 ">
        <NavMenuItem onClick={onMenuClick}>
          <MainHamburger />
        </NavMenuItem>
        <NavMenuItem onClick={() => console.log('click')}>
          <h1 className="text-[0px]">Lookids</h1>
          <MainTopLogo />
        </NavMenuItem>
      </ul>
      <ul className="flex items-center justify-end gap-x-1">
        <NavMenuItem onClick={() => console.log('click')}>
          <BellTest />
        </NavMenuItem>
        <NavMenuItem onClick={() => console.log('click')}>
          <MainTopSearch />
        </NavMenuItem>
      </ul>
    </nav>
  );
}

export default NavMenus;
