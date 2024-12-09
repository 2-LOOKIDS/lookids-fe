'use client';

import { Search, X } from 'lucide-react';

import MainHamburger from '../icons/topNavBar/MainHamburger';
import MainTopLogo from '../icons/topNavBar/MainTopLogo';
import MainTopSearch from '../icons/topNavBar/MainTopSearch';
import NavMenuItem from './NavMenuItem';
import NotificationBellIcon from '../common/NotificationBellIcon';
import { NotificationModal } from '../icons/topNavBar/NotificationModal';
import SearchBar from '../common/SearchBar';
import { useNotification } from '../../hooks/useNotification';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

function NavMenus({ onMenuClick }: HeaderProps) {
  const {
    notificationData,
    isModalOpen,
    hasNotification,
    closeModal,
    openModal,
  } = useNotification();
  const [isSearch, setIsSearch] = useState(false);

  return (
    <>
      {isSearch ? (
        <SearchBar />
      ) : (
        <>
          <ul className="flex items-center gap-x-2">
            <NavMenuItem onClick={onMenuClick}>
              <MainHamburger />
            </NavMenuItem>
            <NavMenuItem>
              <h1 className="text-[0px]">Lookids</h1>
              <MainTopLogo />
            </NavMenuItem>
          </ul>
          <ul className="flex items-center gap-x-1">
            <NavMenuItem>
              <NotificationBellIcon
                hasNotification={hasNotification}
                onClick={openModal}
              />
            </NavMenuItem>
            <NavMenuItem>
              <div onClick={() => setIsSearch(true)}>
                <Search color="#ffa200" size={22} />
              </div>
            </NavMenuItem>
          </ul>
          <NotificationModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            notificationData={notificationData}
          />
        </>
      )}
    </>
  );
}

export default NavMenus;
